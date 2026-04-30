// OpenAI-compatible LLM provider
// Works with OpenAI, Groq, Together, or any OpenAI-compatible REST endpoint.
// Configure via environment variables — no API key hardcoded.

import { z } from 'zod';
import type {
  LLMService,
  LLMServiceConfig,
  LLMResponse,
  LLMMessage,
  LLMToolDefinition,
} from '../service';

interface OpenAICompatibleConfig extends LLMServiceConfig {
  apiKey: string;
  baseUrl: string;
  defaultSystemPrompt?: string;
}

// ─── API shapes ─────────────────────────────────────────────────────────────

interface OpenAIMessage {
  role: string;
  content: string;
  name?: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

interface OpenAIChoice {
  finish_reason: string;
  message: OpenAIMessage;
}

interface OpenAIChatResponse {
  id: string;
  model: string;
  choices: OpenAIChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ─── Helper: fetch wrapper ───────────────────────────────────────────────────

async function openaiFetch(
  baseUrl: string,
  path: string,
  apiKey: string,
  body: unknown,
): Promise<unknown> {
  const url = `${baseUrl.replace(/\/$/, '')}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'unknown error');
    throw new Error(`OpenAI-compatible API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<unknown>;
}

// ─── Implementation ──────────────────────────────────────────────────────────

export class OpenAICompatibleService implements LLMService {
  readonly config: LLMServiceConfig;
  readonly providerName: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultSystemPrompt: string;

  constructor(cfg: OpenAICompatibleConfig) {
    this.config = { model: cfg.model };
    this.providerName = 'openai-compatible';
    this.apiKey = cfg.apiKey;
    this.baseUrl = cfg.baseUrl;
    this.defaultSystemPrompt = cfg.defaultSystemPrompt ?? '';
  }

  static fromEnv(): OpenAICompatibleService | null {
    const apiKey = process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? '';
    const baseUrl = process.env.LLM_BASE_URL ?? process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
    const model = process.env.LLM_MODEL ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

    if (!apiKey) return null;

    return new OpenAICompatibleService({
      apiKey,
      baseUrl,
      model,
      defaultSystemPrompt:
        'You are a helpful crypto wallet assistant. Always respond with valid JSON when asked to structure output.',
    });
  }

  async complete(prompt: string, systemPrompt?: string): Promise<LLMResponse> {
    const msgs: OpenAIMessage[] = [];
    if (systemPrompt ?? this.defaultSystemPrompt) {
      msgs.push({ role: 'system', content: systemPrompt ?? this.defaultSystemPrompt });
    }
    msgs.push({ role: 'user', content: prompt });

    const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
      model: this.config.model,
      messages: msgs,
      max_tokens: this.config.maxTokens ?? 1024,
      temperature: this.config.temperature ?? 0.3,
    }) as OpenAIChatResponse;

    return this._mapChoice(raw.choices[0]);
  }

  async chat(messages: LLMMessage[], systemPrompt?: string): Promise<LLMResponse> {
    const msgs: OpenAIMessage[] = [];

    if (systemPrompt ?? this.defaultSystemPrompt) {
      msgs.push({ role: 'system', content: systemPrompt ?? this.defaultSystemPrompt });
    }

    for (const m of messages) {
      msgs.push({ role: m.role, content: m.content, name: m.name });
    }

    const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
      model: this.config.model,
      messages: msgs,
      max_tokens: this.config.maxTokens ?? 1024,
      temperature: this.config.temperature ?? 0.3,
    }) as OpenAIChatResponse;

    return this._mapChoice(raw.choices[0]);
  }

  async structuredOutput<T extends z.ZodType>(
    prompt: string,
    systemPrompt: string,
    outputSchema: T,
    maxRetries = 2,
  ): Promise<z.infer<T>> {
    const msgs: OpenAIMessage[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `${prompt}\n\nYou must respond with ONLY valid JSON matching this schema. No markdown, no explanation.`,
      },
    ];

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const raw = await openaiFetch(this.baseUrl, '/chat/completions', this.apiKey, {
        model: this.config.model,
        messages: msgs,
        max_tokens: this.config.maxTokens ?? 2048,
        temperature: this.config.temperature ?? 0.1,
        response_format: { type: 'json_object' },
      }) as OpenAIChatResponse;

      const choice = raw.choices[0];
      const content = choice.message.content ?? '';

      try {
        const parsed = outputSchema.safeParse(JSON.parse(content));
        if (parsed.success) return parsed.data;

        // On last attempt, throw
        if (attempt === maxRetries) {
          throw new Error(
            `LLM output failed Zod validation: ${parsed.error.issues.map(i => i.message).join('; ')}`,
          );
        }

        // Add error context and retry
        msgs.push({ role: 'assistant', content });
        msgs.push({
          role: 'user',
          content: `Your previous JSON was invalid: ${parsed.error.issues.map(i => i.message).join('; ')}. Please respond with ONLY valid JSON.`,
        });
      } catch (err: unknown) {
        // If JSON.parse failed, retry with correction prompt
        if (err instanceof SyntaxError) {
          if (attempt === maxRetries) throw err;
          msgs.push({ role: 'assistant', content });
          msgs.push({
            role: 'user',
            content: `Your previous response was not valid JSON. Please respond with ONLY valid JSON, no other text.`,
          });
          continue;
        }
        throw err;
      }
    }

    // Should not reach here
    throw new Error('structuredOutput: exhausted retries without result');
  }

  listTools(): LLMToolDefinition[] {
    return []; // Tools are defined at the agent level, not the service level
  }

  private _mapChoice(choice: OpenAIChoice): LLMResponse {
    const finishReason = choice.finish_reason as LLMResponse['finishReason'];
    const toolCalls = choice.message.tool_calls?.map((tc) => ({
      toolName: tc.function.name,
      input: JSON.parse(tc.function.arguments),
      callId: tc.id,
    }));

    return {
      content: choice.message.content ?? '',
      finishReason,
      toolCalls,
      usage: undefined,
    };
  }
}
