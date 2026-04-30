// Provider-agnostic LLM service interface
// All concrete implementations must conform to this interface.

import { z } from 'zod';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  toolCallId?: string;
}

export interface LLMToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodType<unknown>;
}

export interface LLMToolCall {
  toolName: string;
  input: unknown;
  callId: string;
}

export interface LLMResponse {
  content: string;
  finishReason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'unknown';
  toolCalls?: LLMToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMServiceConfig {
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMService {
  readonly config: LLMServiceConfig;
  readonly providerName: string;

  /**
   * Send a plain text prompt and receive a text response.
   */
  complete(prompt: string, systemPrompt?: string): Promise<LLMResponse>;

  /**
   * Send a structured conversation and receive a text response.
   */
  chat(messages: LLMMessage[], systemPrompt?: string): Promise<LLMResponse>;

  /**
   * Request a structured JSON output conforming to a Zod schema.
   * The implementation handles prompting and parsing.
   * Throws if parsing fails after retry.
   */
  structuredOutput<T extends z.ZodType>(
    prompt: string,
    systemPrompt: string,
    outputSchema: T,
    maxRetries?: number,
  ): Promise<z.infer<T>>;

  /**
   * List available tool definitions this service supports.
   */
  listTools(): LLMToolDefinition[];
}
