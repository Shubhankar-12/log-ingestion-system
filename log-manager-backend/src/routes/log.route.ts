import { Router } from "express";
import { LogController } from "../controllers/log.controller";
import { WebSocket } from "ws";

export const createRoutes = (wsClients: Set<WebSocket>) => {
  const router = Router();
  const logController = new LogController(wsClients);

  router.post("/logs", logController.ingestLog);
  router.get("/logs", logController.queryLogs);
  router.get("/health", logController.healthCheck);

  return router;
};
