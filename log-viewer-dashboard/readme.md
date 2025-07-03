# React Log Viewer Dashboard

A professional log monitoring interface built with React and Next.js for real-time log ingestion and analysis. Features a clean, developer-focused UI similar to tools like Datadog or Grafana.

## ✨ Features

- **Real-time Log Monitoring** - Display logs in reverse chronological order with live filtering
- **Advanced Filtering** - Text search, log level filtering, resource ID filtering, and date range selection
- **Visual Log Indicators** - Color-coded log levels (Error: red, Warning: yellow, Info: blue, Debug: gray)
- **Add New Logs** - Interactive form to create new log entries with validation
- **Professional UI** - Clean, minimal design optimized for developer workflows
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **API Integration** - Full REST API integration for log management

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-log-viewer-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

# or

yarn install

# or

pnpm install

# or

bun install

````

### Development Server

Start the development server:

```bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
````

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-reload when you make changes to the code.

## 🏗️ Build Instructions

### Production Build

Create an optimized production build:

```bash
npm run build

# or

yarn build

# or

pnpm build

# or

bun build
```

### Start Production Server

After building, start the production server:

```bash
npm run start

# or

yarn start

# or

pnpm start

# or

bun start
```

### Static Export (Optional)

To export as static files:

```bash
npm run build
npm run export
```

## 🏛️ Component Architecture Overview

### Project Structure

```
src/
├── app/                       # Next.js App Router
│ ├── page.tsx                 # Main dashboard page
│ ├── layout.tsx               # Root layout
│ ├── loading.tsx              # Loading component
│ └── globals.css              # Global styles
├── components/                # Reusable UI components
│ ├── dashboard-header.tsx     # Header with title and actions
│ ├── add-log/                 # Add log functionality
│ │ ├── add-log-dialog.tsx     # Modal dialog wrapper
│ │ └── add-log-form.tsx       # Log creation form
│ ├── filters/                 # Filter components
│ │ ├── filter-panel.tsx       # Main filter container
│ │ ├── search-filter.tsx      # Text search input
│ │ ├── level-filter.tsx       # Log level dropdown
│ │ ├── resource-filter.tsx    # Resource ID filter
│ │ └── date-range-filter.tsx  # Date/time range picker
│ ├── logs/                    # Log display components
│ │ ├── log-list.tsx           # Log container with states
│ │ └── log-item.tsx           # Individual log entry
│ └── ui/                      # shadcn/ui components
├── hooks/                     # Custom React hooks
│ ├── use-debounce.ts          # Debounce hook for search
│ └── use-logs.ts              # Main logs state management
├── services/                  # API services
│ ├── log-service.ts           # Log fetching service
│ └── log-api.ts               # Log creation API
├── types/                     # TypeScript definitions
│ └── log.ts                   # Log-related interfaces
└── utils/                     # Utility functions
└── log-styles.ts              # Styling and formatting utils
```

### Core Components

#### 🎛️ Dashboard Components

- **`DashboardHeader`** - Main header with title, description, and action buttons
- **`FilterPanel`** - Container for all filtering controls with clear functionality
- **`LogList`** - Main log display with loading, error, and empty states

#### 🔍 Filter Components

- **`SearchFilter`** - Debounced text search for log messages
- **`LevelFilter`** - Dropdown for selecting log levels (error, warn, info, debug)
- **`ResourceFilter`** - Text input for filtering by resource ID
- **`DateRangeFilter`** - Date/time range picker for temporal filtering

#### 📝 Log Components

- **`LogItem`** - Individual log entry with color-coded styling and metadata
- **`AddLogDialog`** - Modal dialog for creating new log entries
- **`AddLogForm`** - Comprehensive form with validation and helper functions

#### 🔧 Custom Hooks

- **`useLogs`** - Main state management hook handling:
  - Log fetching and caching
  - Filter state management
  - Debounced API calls
  - Error handling
- **`useDebounce`** - Generic debounce hook for performance optimization

#### 🌐 Services

- **`log-service.ts`** - Handles GET requests for fetching logs with filters

### Data Flow

1. **State Management**: `useLogs` hook manages all log-related state
2. **Filtering**: Filter changes trigger debounced API calls
3. **API Integration**: Services handle all HTTP requests with proper error handling
4. **UI Updates**: Components reactively update based on state changes
5. **User Actions**: Form submissions and interactions flow through proper handlers

### Styling Architecture

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent, accessible components
- **CSS Variables** for theme customization
- **Responsive Design** with mobile-first approach
- **Color-coded Log Levels** for quick visual identification

## 🔌 API Integration

### Endpoints

#### GET /logs

Fetch logs with optional query parameters:

- `level`: Filter by log level
- `message`: Text search in messages
- `resourceId`: Filter by resource ID
- `timestamp_start`: Start date filter
- `timestamp_end`: End date filter

#### POST /logs

Create a new log entry with the following schema:

```json
{
"level": "error" | "warn" | "info" | "debug",
"message": "string",
"resourceId": "string",
"timestamp": "ISO 8601 string",
"traceId": "string",
"spanId": "string",
"commit": "string",
"metadata": {}
}
```

### Configuration

Update the API base URL in `services/log-api.ts`:

```typescript
const API_BASE_URL = "http://localhost:3001"; // Change as needed
```

## 🎨 Customization

### Theming

The application supports light/dark themes through CSS variables. Customize colors in `app/globals.css`:

```css
:root {
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
/_ ... other variables _/
}
```

### Log Level Colors

Modify log level styling in `utils/log-styles.ts`:

```typescript
export const getLogLevelStyles = (level: LogEntry["level"]) => {
  // Customize colors and styles here
};
```

## 🧪 Testing

### Running Tests

```bash
npm run test

# or

yarn test
```

### Test Structure

- Unit tests for individual components
- Integration tests for hooks and services
- E2E tests for critical user flows

## 📦 Dependencies

### Core Dependencies

- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

### UI Components

- **shadcn/ui** - Accessible component library
- **Lucide React** - Icon library
- **Radix UI** - Headless UI primitives

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package\*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Hosting

For static deployment:

```bash
npm run build
npm run export
```

Deploy the `out/` directory to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add tests for new features
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation
- Review existing issues and discussions

## 🔄 Changelog

### v1.0.0

- Initial release with core log viewing functionality
- Advanced filtering system
- Add log functionality
- Responsive design
- API integration

---

Built with ❤️ using React, Next.js, and TypeScript
