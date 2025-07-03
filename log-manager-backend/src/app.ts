import express from "express";
import cors from "cors";
import logRoutes from "./routes/log.route";
import { errorHandler, notFoundHandler } from "./midllewares/log.middlware";

export const createApp = (): express.Application => {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Routes
  app.use("/", logRoutes);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
