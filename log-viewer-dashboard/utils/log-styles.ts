import type { LogEntry, LogLevelStyles } from "@/types/log";

export const getLogLevelStyles = (level: LogEntry["level"]): LogLevelStyles => {
  // Ensure level is lowercase for consistent comparison
  const normalizedLevel = level?.toLowerCase() as LogEntry["level"];

  switch (normalizedLevel) {
    case "error":
      return {
        badge:
          "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200",
        border: "border-l-red-500",
        bg: "bg-red-50 dark:bg-red-950",
      };
    case "warn":
      return {
        badge:
          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
        border: "border-l-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950",
      };
    case "info":
      return {
        badge:
          "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200",
        border: "border-l-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950",
      };
    case "debug":
      return {
        badge:
          "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200",
        border: "border-l-gray-500",
        bg: "bg-gray-50 dark:bg-gray-950",
      };
    default:
      return {
        badge:
          "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200",
        border: "border-l-gray-500",
        bg: "bg-gray-50 dark:bg-gray-950",
      };
  }
};

export const formatTimestamp = (timestamp: string): string => {
  try {
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    console.error("Error formatting timestamp:", timestamp, error);
    return "Invalid date";
  }
};
