import fs from "fs/promises";
import path from "path";
import { LogEntry, LogsDatabase } from "../types/log.types";

export class DatabaseUtils {
  private static dbPath = path.join(process.cwd(), "logs.json");

  static async initializeDatabase(): Promise<void> {
    try {
      await fs.access(this.dbPath);
    } catch {
      const initialData: LogsDatabase = { logs: [] };
      await fs.writeFile(this.dbPath, JSON.stringify(initialData, null, 2));
    }
  }

  static async readLogs(): Promise<LogEntry[]> {
    try {
      const data = await fs.readFile(this.dbPath, "utf-8");
      const parsed: LogsDatabase = JSON.parse(data);
      return parsed.logs || [];
    } catch (error) {
      console.error("Error reading logs:", error);
      throw new Error("Failed to read log data");
    }
  }

  static async writeLogs(logs: LogEntry[]): Promise<void> {
    try {
      const data: LogsDatabase = { logs };
      await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing logs:", error);
      throw new Error("Failed to persist log data");
    }
  }
}
