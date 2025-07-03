# Log Ingestion and Querying System

A full-stack application for collecting and searching through log entries. Built with Node.js/Express backend and React frontend.

## What This Does

This system lets you:

- **Send log entries** to a backend API (like error messages, info logs, etc.)
- **Search and filter** those logs through a web interface
- **View logs** in a clean, organized way with color-coded levels

Think of it like a simple version of tools like Splunk or Datadog for developers.

## Project Structure

```
log-system/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── controllers/  # Handle HTTP requests
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API endpoints
│   │   └── ...
│   └── logs.json         # Where log data is stored
├── frontend/             # React web app
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
└── README.md
```

## Features

### Backend (Node.js + Express)

- ✅ **POST /logs** - Add new log entries
- ✅ **GET /logs** - Get logs with filtering options
- ✅ **JSON file storage** - No database needed
- ✅ **Data validation** - Checks log format is correct
- ✅ **Error handling** - Proper error messages

### Frontend (React)

- ✅ **Log viewer** - See all logs in a table
- ✅ **Search** - Find logs by message content
- ✅ **Filter by level** - Show only errors, warnings, etc.
- ✅ **Date range** - Filter logs by time period
- ✅ **Resource filter** - Filter by server/service name
- ✅ **Color coding** - Red for errors, yellow for warnings

### Log Data Format

Each log entry contains:

```json
{
  "level": "error", // error, warn, info, debug
  "message": "Database connection failed", // What happened
  "resourceId": "server-1234", // Which server/service
  "timestamp": "2023-09-15T08:00:00Z", // When it happened
  "traceId": "abc-xyz-123", // Request tracking ID
  "spanId": "span-456", // Operation tracking ID
  "commit": "5e5342f", // Code version
  "metadata": {
    // Extra info
    "parentResourceId": "server-5678"
  }
}
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd log-ingestion-system
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:3001

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

### 4. Test It Works

Send a test log:

```bash
curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "error",
    "message": "Test error message",
    "resourceId": "test-server",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "test-trace-123",
    "spanId": "test-span-456",
    "commit": "abc123",
    "metadata": {}
  }'
```

Then open http://localhost:3000 to see the log appear!

## API Endpoints

### POST /logs

Add a new log entry.

**Request:**

```bash
curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{ "level": "info", "message": "User logged in", ... }'
```

**Response:** Returns the saved log entry with 201 status.

### GET /logs

Get logs with optional filtering.

**Examples:**

```bash
# Get all logs
curl http://localhost:3001/logs

# Get only error logs
curl http://localhost:3001/logs?level=error

# Search for "database" in messages
curl http://localhost:3001/logs?message=database

# Get logs from specific server
curl http://localhost:3001/logs?resourceId=server-1234

# Get logs from date range
curl "http://localhost:3001/logs?timestamp_start=2023-09-15T00:00:00Z&timestamp_end=2023-09-15T23:59:59Z"

# Combine filters (error logs with "database" from server-1234)
curl "http://localhost:3001/logs?level=error&message=database&resourceId=server-1234"
```

## Development

### Backend Commands

```bash
npm run dev          # Start development server with auto-reload
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Check code quality
```

### Frontend Commands

```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Check code quality
```

### Project Features

#### Backend Architecture

- **Controllers** - Handle HTTP requests and responses
- **Services** - Business logic for managing logs
- **Routes** - Define API endpoints
- **Middleware** - Error handling and logging
- **Utils** - Database file operations
- **Validation** - Check data format with Zod

#### Frontend Architecture

- **Components** - Reusable UI pieces
- **Services** - API calls to backend
- **Hooks** - Custom React hooks for state management
- **Utils** - Helper functions

## Design Decisions

### Why JSON File Instead of Database?

- **Simplicity** - No database setup required
- **Portability** - Easy to move and backup
- **Focus** - Keeps attention on application logic
- **Requirements** - Assignment specifically requested file-based storage

### Why This Tech Stack?

- **Node.js + Express** - Fast, simple backend API
- **React** - Modern, component-based frontend
- **TypeScript** - Type safety and better development experience
- **Zod** - Runtime validation and type inference

## Common Issues

### Backend won't start

- Check if port 3001 is available
- Make sure Node.js 18+ is installed
- Run `npm install` to install dependencies

### Frontend won't connect to backend

- Make sure backend is running on port 3001
- Check CORS settings in backend
- Verify API endpoints are correct

### Logs not appearing

- Check browser console for errors
- Verify log format matches schema
- Check backend logs for error messages

## Production Deployment

### Backend

```bash
npm run build
npm start
```

### Frontend

```bash
npm run build
# Deploy the 'build' folder to your web server
```

### Additional Features

<!-- added modal to add logs and generate random logs for testing -->

- [] Add modal to add logs
- [] Generate random logs for testing

### Environment Variables

Backend supports these optional environment variables:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

## License

MIT License - feel free to use this code for your projects!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

---

**Need help?** Open an issue or check the code comments for more details!
