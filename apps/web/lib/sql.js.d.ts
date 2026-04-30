// Type declaration for sql.js
declare module 'sql.js' {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  interface Database {
    run(sql: string, params?: unknown[]): void;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  interface Statement {
    run(params?: unknown[]): void;
    free(): void;
  }

  interface QueryExecResult {
    columns: string[];
    values: unknown[][];
  }

  function initSqlJs(): Promise<SqlJsStatic>;
  export default initSqlJs;
  export { Database, SqlJsStatic, QueryExecResult, Statement };
}
