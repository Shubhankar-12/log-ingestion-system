# Log Ingestion Backend

A Node.js/Express backend service for ingesting and querying log data with TypeScript and structured architecture.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:3001
```

### Authentication

No authentication required for this development version.

### Content Type

All requests and responses use `application/json`.

---

## 🛠️ API Endpoints

### 1. Health Check

Check if the service is running.

**Endpoint:** `GET /health`

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2023-09-15T08:00:00Z",
  "service": "log-ingestion-api"
}
```

**Status Codes:**

- `200 OK`: Service is healthy

---

### 2. Ingest Log

Store a new log entry.

**Endpoint:** `POST /logs`

**Request Body:**

```json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678",
    "userId": "user-456"
  }
}
```

**Request Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| level | string | ✅ | Log level: `error`, `warn`, `info`, `debug` |
| message | string | ✅ | Primary log message |
| resourceId | string | ✅ | Resource identifier (server, container, etc.) |
| timestamp | string | ✅ | ISO 8601 timestamp |
| traceId | string | ✅ | Unique trace identifier |
| spanId | string | ✅ | Unique span identifier |
| commit | string | ✅ | Git commit hash |
| metadata | object | ✅ | Additional context (can be empty object) |

**Success Response (201):**

```json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}
```

**Error Response (400):**

```json
{
  "error": "Invalid log data",
  "details": [
    {
      "code": "invalid_enum_value",
      "expected": ["error", "warn", "info", "debug"],
      "received": "critical",
      "path": ["level"],
      "message": "Invalid enum value. Expected 'error' | 'warn' | 'info' | 'debug', received 'critical'"
    }
  ]
}
```

**Status Codes:**

- `201 Created`: Log successfully ingested
- `400 Bad Request`: Invalid request body or schema validation failure
- `500 Internal Server Error`: Server error during processing

---

### 3. Query Logs

Retrieve logs with optional filtering.

**Endpoint:** `GET /logs`

**Query Parameters:**
All parameters are optional and can be combined using AND logic.

| Parameter       | Type   | Description                         | Example                                 |
| --------------- | ------ | ----------------------------------- | --------------------------------------- |
| level           | string | Filter by log level                 | `?level=error`                          |
| message         | string | Full-text search in messages        | `?message=database`                     |
| resourceId      | string | Filter by resource ID               | `?resourceId=server-1234`               |
| timestamp_start | string | Start of timestamp range (ISO 8601) | `?timestamp_start=2023-09-15T00:00:00Z` |
| timestamp_end   | string | End of timestamp range (ISO 8601)   | `?timestamp_end=2023-09-15T23:59:59Z`   |
| traceId         | string | Filter by trace ID                  | `?traceId=abc-xyz-123`                  |
| spanId          | string | Filter by span ID                   | `?spanId=span-456`                      |
| commit          | string | Filter by commit hash               | `?commit=5e5342f`                       |

**Example Requests:**

```bash
# Get all error logs
curl "http://localhost:3001/logs?level=error"

# Search for database-related logs
curl "http://localhost:3001/logs?message=database"

# Combined filtering
curl "http://localhost:3001/logs?level=error&message=database&resourceId=server-1234"

# Timestamp range filtering
curl "http://localhost:3001/logs?timestamp_start=2023-09-15T00:00:00Z&timestamp_end=2023-09-15T23:59:59Z"
```

**Success Response (200):**

```json
[
  {
    "level": "error",
    "message": "Database connection failed",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-5678"
    }
  }
]
```

**Response Notes:**

- Results are sorted by timestamp in descending order (newest first)
- Empty array `[]` returned if no logs match the criteria
- All filters use AND logic when combined

**Status Codes:**

- `200 OK`: Query successful (may return empty array)
- `500 Internal Server Error`: Server error during query processing

---

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── log.controller.ts    # HTTP request handlers
│   ├── services/
│   │   └── log.service.ts       # Business logic
│   ├── routes/
│   │   └── log.routes.ts        # API route definitions
│   ├── middleware/
│   │   └── error.middleware.ts  # Error handling
│   ├── types/
│   │   └── log.types.ts         # TypeScript interfaces
│   ├── schemas/
│   │   └── log.schema.ts        # Zod validation schemas
│   ├── utils/
│   │   └── database.utils.ts    # File operations
│   ├── app.ts                   # Express app configuration
│   └── index.ts                 # Application entry point
├── dist/                        # Compiled JavaScript (generated)
├── logs.json                   # Log database file (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Database Configuration
LOG_DB_PATH=./logs.json

# Logging Configuration
LOG_LEVEL=debug
```

**Environment Variables:**

| Variable     | Default               | Description               |
| ------------ | --------------------- | ------------------------- |
| PORT         | 3001                  | Server port               |
| NODE_ENV     | development           | Environment mode          |
| FRONTEND_URL | http://localhost:3000 | Frontend URL for CORS     |
| LOG_DB_PATH  | ./logs.json           | Path to log database file |
| LOG_LEVEL    | debug                 | Application log level     |

## 📊 Performance Considerations

### Current Implementation

- **In-memory filtering**: All logs loaded into memory for filtering
- **File-based storage**: JSON file read/write for each operation
- **No pagination**: All matching results returned

### Limitations

- **Memory usage**: Scales linearly with log count
- **Response time**: Increases with database size
- **Concurrent access**: No locking mechanism for file operations

### Optimization Strategies (for production)

1. **Pagination**: Implement offset/limit query parameters
2. **Indexing**: Create in-memory indexes for common filters
3. **Caching**: Cache frequent queries
4. **Database**: Migrate to proper database for high-volume usage
5. **Streaming**: Stream large result sets

## 🚀 Deployment

```bash
# Run development server
npm run dev

# Run production server
npm run build && npm start

```

### Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Configure proper logging
- [ ] Set up process management (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and health checks
- [ ] Configure SSL/TLS
- [ ] Set up backup strategy for logs.json

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**

```bash
# Kill process using port 3001
sudo lsof -ti:3001 | xargs kill -9
```

**2. Permission Denied (logs.json)**

```bash
# Fix file permissions
chmod 644 logs.json
```

**3. TypeScript Compilation Errors**

```bash
# Clean and rebuild
npm run clean
npm run build
```

**4. CORS Issues**

- Ensure FRONTEND_URL environment variable is set correctly
- Check if frontend is running on the expected port

## 📝 API Testing

### Using cURL

```bash
# Health check
curl http://localhost:3001/health

# Ingest log
curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "error",
    "message": "Test error message",
    "resourceId": "test-server",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "test-trace",
    "spanId": "test-span",
    "commit": "test-commit",
    "metadata": {}
  }'

# Query logs
curl "http://localhost:3001/logs?level=error"
```

### Using Postman

Import the following collection:

```json
{
  "info": {
    "name": "Log Ingestion API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/health"
      }
    },
    {
      "name": "Ingest Log",
      "request": {
        "method": "POST",
        "url": "http://localhost:3001/logs",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"level\": \"error\",\n  \"message\": \"Test error message\",\n  \"resourceId\": \"test-server\",\n  \"timestamp\": \"2023-09-15T08:00:00Z\",\n  \"traceId\": \"test-trace\",\n  \"spanId\": \"test-span\",\n  \"commit\": \"test-commit\",\n  \"metadata\": {}\n}"
        }
      }
    },
    {
      "name": "Query Logs",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/logs?level=error"
      }
    }
  ]
}
```

---

For more information, see the [main README](../README.md) in the project root.
