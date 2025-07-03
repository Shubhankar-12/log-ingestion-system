export interface LogEntry {
  level: "error" | "warn" | "info" | "debug";
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
}

export interface LogsDatabase {
  logs: LogEntry[];
}

export interface LogQueryParams {
  level?: string;
  message?: string;
  resourceId?: string;
  timestamp_start?: string;
  timestamp_end?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
}
