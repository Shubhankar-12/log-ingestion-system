import { Router } from "express";
import { LogController } from "../controllers/log.controller";

const router = Router();
const logController = new LogController();

router.post("/logs", logController.ingestLog);
router.get("/logs", logController.queryLogs);
router.get("/health", logController.healthCheck);

export default router;
