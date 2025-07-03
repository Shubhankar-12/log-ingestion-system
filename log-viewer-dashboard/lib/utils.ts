import { LogEntry } from "@/types/log";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type LogLevel = "error" | "warn" | "info" | "debug";
export function generateLogEntry(): LogEntry {
  const levels: LogLevel[] = ["error", "warn", "info", "debug"];
  const messages = [
    "Failed to connect to database",
    "User authentication succeeded",
    "Cache miss for key 'user:123'",
    "Unhandled exception in service",
    "Request timeout after 5000ms",
  ];

  return {
    level: getRandomElement(levels),
    message: getRandomElement(messages),
    resourceId: `server-${Math.floor(Math.random() * 9000 + 1000)}`,
    timestamp: new Date().toISOString(),
    traceId: `trace-${Math.random().toString(36).substring(2, 10)}`,
    spanId: `span-${Math.random().toString(36).substring(2, 10)}`,
    commit: Math.random().toString(16).substring(2, 9),
    metadata: {
      parentResourceId: `server-${Math.floor(Math.random() * 9000 + 1000)}`,
    },
  };
}

// Example usage
console.log(generateLogEntry());
