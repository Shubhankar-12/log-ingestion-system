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

export interface LogFilters {
  message: string;
  level: string;
  resourceId: string;
  timestamp_start: string;
  timestamp_end: string;
}

export interface LogLevelStyles {
  badge: string;
  border: string;
  bg: string;
}

// Add new interface for creating logs
export interface CreateLogRequest {
  level: "error" | "warn" | "info" | "debug";
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
}
