import { z } from "zod";

export const LogSchema = z.object({
  level: z.enum(["error", "warn", "info", "debug"]),
  message: z.string().min(1, "Message is required"),
  resourceId: z.string().min(1, "Resource ID is required"),
  timestamp: z.string().datetime("Invalid timestamp format"),
  traceId: z.string().min(1, "Trace ID is required"),
  spanId: z.string().min(1, "Span ID is required"),
  commit: z.string().min(1, "Commit is required"),
  metadata: z.record(z.any()).default({}),
});

export const QueryParamsSchema = z.object({
  level: z.enum(["error", "warn", "info", "debug"]).optional(),
  message: z.string().optional(),
  resourceId: z.string().optional(),
  timestamp_start: z.string().datetime().optional(),
  timestamp_end: z.string().datetime().optional(),
  traceId: z.string().optional(),
  spanId: z.string().optional(),
  commit: z.string().optional(),
});
