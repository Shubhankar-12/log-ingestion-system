import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path,
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
};
