import { Request, Response } from "express";
import { WebSocket } from "ws"; // Add this import
import { LogService } from "../services/log.service";
import { LogSchema } from "../schemas/log.schema";
import { LogQueryParams } from "../types/log.types";

export class LogController {
  private logService: LogService;
  private wsClients: Set<WebSocket>;

  constructor(wsClients: Set<WebSocket>) {
    this.logService = new LogService();
    this.wsClients = wsClients;
  }

  ingestLog = async (req: Request, res: Response): Promise<void> => {
    try {
      const validationResult = LogSchema.safeParse(req.body);

      if (!validationResult.success) {
        res.status(400).json({
          error: "Invalid log data",
          details: validationResult.error.issues,
        });
        return;
      }

      const logEntry = validationResult.data;
      const savedLog = await this.logService.addLog(logEntry);

      // Broadcast to all connected WebSocket clients
      const payload = JSON.stringify({ type: "NEW_LOG", payload: savedLog });
      this.wsClients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(payload);
        }
      });

      res.status(201).json(savedLog);
    } catch (error) {
      console.error("Error ingesting log:", error);
      res.status(500).json({ error: "Failed to ingest log" });
    }
  };

  queryLogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryParams: LogQueryParams = {
        level: req.query.level as string,
        message: req.query.message as string,
        resourceId: req.query.resourceId as string,
        timestamp_start: req.query.timestamp_start as string,
        timestamp_end: req.query.timestamp_end as string,
        traceId: req.query.traceId as string,
        spanId: req.query.spanId as string,
        commit: req.query.commit as string,
      };

      // Remove undefined values
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key as keyof LogQueryParams] === undefined) {
          delete queryParams[key as keyof LogQueryParams];
        }
      });

      const logs = await this.logService.queryLogs(queryParams);
      res.json(logs);
    } catch (error) {
      console.error("Error querying logs:", error);
      res.status(500).json({ error: "Failed to retrieve logs" });
    }
  };

  healthCheck = (req: Request, res: Response): void => {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "log-ingestion-api",
    });
  };
}
