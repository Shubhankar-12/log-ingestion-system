import type { CreateLogRequest, LogEntry, LogFilters } from "@/types/log";

// Mock API function - replace with actual API call
/*
[
    {
      level: "error",
      message: "Failed to connect to database",
      resourceId: "server-1234",
      timestamp: "2023-09-15T08:00:00Z",
      traceId: "abc-xyz-123",
      spanId: "span-456",
      commit: "5e5342f",
      metadata: { parentResourceId: "server-5678" },
    },
    {
      level: "warn",
      message: "High memory usage detected",
      resourceId: "server-5678",
      timestamp: "2023-09-15T07:55:00Z",
      traceId: "def-uvw-456",
      spanId: "span-789",
      commit: "3a1b2c4",
      metadata: {},
    },
    {
      level: "info",
      message: "User authentication successful",
      resourceId: "auth-service",
      timestamp: "2023-09-15T07:50:00Z",
      traceId: "ghi-rst-789",
      spanId: "span-012",
      commit: "7f8e9d0",
      metadata: { parentResourceId: "api-gateway" },
    },
    {
      level: "debug",
      message: "Cache hit for user profile",
      resourceId: "cache-redis",
      timestamp: "2023-09-15T07:45:00Z",
      traceId: "jkl-opq-012",
      spanId: "span-345",
      commit: "1a2b3c4",
      metadata: {},
    },
    {
      level: "error",
      message: "Payment processing failed",
      resourceId: "payment-service",
      timestamp: "2023-09-15T07:40:00Z",
      traceId: "mno-tuv-345",
      spanId: "span-678",
      commit: "9e8d7c6",
      metadata: { parentResourceId: "api-gateway" },
    },
    {
      level: "info",
      message: "Scheduled backup completed successfully",
      resourceId: "backup-service",
      timestamp: "2023-09-15T07:35:00Z",
      traceId: "pqr-wxy-678",
      spanId: "span-901",
      commit: "5f4e3d2",
      metadata: {},
    },
  ];

  return resp.filter((log) => {
    if (
      filters.message &&
      !log.message.toLowerCase().includes(filters.message.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.level &&
      filters.level !== "all" &&
      log.level !== filters.level
    ) {
      return false;
    }
    if (
      filters.resourceId &&
      !log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())
    ) {
      return false;
    }
    // Note: In a real implementation, you'd also filter by timestamp_start and timestamp_end
    return true;
  });

*/

const covertIntoQueryParams = (filters: LogFilters): string => {
  const queryParams = new URLSearchParams();
  queryParams.append("message", filters.message);
  queryParams.append("level", filters.level);
  queryParams.append("resourceId", filters.resourceId);
  queryParams.append("timestamp_start", filters.timestamp_start);
  queryParams.append("timestamp_end", filters.timestamp_end);
  return queryParams.toString();
};

export const createLog = async (logData: CreateLogRequest): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create log: ${response.statusText}`);
  }
};

export const fetchLogs = async (filters: LogFilters): Promise<LogEntry[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/logs?${covertIntoQueryParams(
        filters
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error fetching logs:", response.statusText);
      return [];
    }

    const data: LogEntry[] = await response.json();
    return data.filter((log) => {
      if (
        filters.message &&
        !log.message.toLowerCase().includes(filters.message.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.level &&
        filters.level !== "all" &&
        log.level !== filters.level
      ) {
        return false;
      }
      if (
        filters.resourceId &&
        !log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())
      ) {
        return false;
      }
      // Note: In a real implementation, you'd also filter by timestamp_start and timestamp_end
      return true;
    });
  } catch (error: any) {
    console.error("Error fetching logs:", error);
    return [];
  }
};
