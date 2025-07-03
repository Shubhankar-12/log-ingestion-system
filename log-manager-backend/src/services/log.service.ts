import { LogEntry, LogQueryParams } from "../types/log.types";
import { DatabaseUtils } from "../utils/database.utils";

export class LogService {
  async addLog(log: LogEntry): Promise<LogEntry> {
    const logs = await DatabaseUtils.readLogs();
    logs.push(log);
    await DatabaseUtils.writeLogs(logs);
    return log;
  }

  async queryLogs(params: LogQueryParams): Promise<LogEntry[]> {
    const logs = await DatabaseUtils.readLogs();
    console.log("Read logs:", params);

    let filteredLogs = logs;

    // Apply filters
    if (params.level && params.level !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.level === params.level);
    }

    if (params.message) {
      const searchTerm = params.message.toLowerCase();
      filteredLogs = filteredLogs.filter((log) =>
        log.message.toLowerCase().includes(searchTerm)
      );
    }

    if (params.resourceId) {
      filteredLogs = filteredLogs.filter((log) =>
        log.resourceId.includes(params.resourceId!)
      );
    }

    if (params.traceId) {
      filteredLogs = filteredLogs.filter((log) =>
        log.traceId.includes(params.traceId!)
      );
    }

    if (params.spanId) {
      filteredLogs = filteredLogs.filter((log) =>
        log.spanId.includes(params.spanId!)
      );
    }

    if (params.commit) {
      filteredLogs = filteredLogs.filter((log) =>
        log.commit.includes(params.commit!)
      );
    }

    // Timestamp range filtering
    if (params.timestamp_start) {
      const startTime = new Date(params.timestamp_start);
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.timestamp) >= startTime
      );
    }

    if (params.timestamp_end) {
      const endTime = new Date(params.timestamp_end);
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.timestamp) <= endTime
      );
    }

    // Sort by timestamp (newest first)
    filteredLogs.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return filteredLogs;
  }
}
