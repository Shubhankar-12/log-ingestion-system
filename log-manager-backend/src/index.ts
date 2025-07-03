// index.ts
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createApp } from "./app";
import { DatabaseUtils } from "./utils/database.utils";
// import "dotenv/config";

const startServer = async (): Promise<void> => {
  try {
    await DatabaseUtils.initializeDatabase();
    console.log("✅ Database initialized successfully");

    const wsClients: Set<WebSocket> = new Set();
    const app = createApp(wsClients);
    const server = http.createServer(app);

    const wss = new WebSocketServer({ server });
    wss.on("connection", (ws) => {
      wsClients.add(ws);
      ws.on("close", () => wsClients.delete(ws));
    });

    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`🚀 Log ingestion server running on port ${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`📝 API endpoints:`);
      console.log(`   POST http://localhost:${PORT}/logs - Ingest log`);
      console.log(`   GET  http://localhost:${PORT}/logs - Query logs`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  console.log("\n🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

startServer();
