import { createApp } from "./app";
import { DatabaseUtils } from "./utils/database.utils";
// env
// import "dotenv/config";

const startServer = async (): Promise<void> => {
  try {
    // Initialize database
    await DatabaseUtils.initializeDatabase();
    console.log("✅ Database initialized successfully");

    // Create and start server
    const app = createApp();
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
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

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

startServer();
