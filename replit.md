# Overview

This is an Electron-based desktop productivity application called "ModMenu Pro" that allows users to create and manage different types of interactive widgets. The application provides a customizable overlay interface with widgets for timers, text editors, calendars, and mind maps, designed to enhance productivity and organization. It features global shortcuts, system tray integration, and multi-window support for a true desktop experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite for development and build tooling.

**UI Library**: Radix UI components with shadcn/ui design system, styled with Tailwind CSS for consistent theming and responsive design.

**Routing**: Wouter for lightweight client-side routing.

**State Management**: TanStack Query (React Query) for server state management, with custom hooks for widget, timer, and settings management.

**Styling**: Dark theme-focused design with CSS custom properties for theming, Inter font for typography.

## Backend Architecture

**Server**: Express.js with TypeScript, serving both API endpoints and static assets.

**Database**: PostgreSQL with Drizzle ORM for type-safe database operations and migrations.

**API Design**: RESTful API structure with dedicated routes for widgets, timers, settings, text documents, mind maps, and calendar events.

**Error Handling**: Centralized error handling middleware with structured error responses.

## Data Storage Solutions

**Database Schema**: 
- Widgets table for core widget metadata (type, title, position, data)
- Specialized tables for timer states, text documents, mind maps, and calendar events
- Settings table for application configuration
- Foreign key relationships with cascade deletion for data integrity

**Storage Interface**: Abstract storage interface pattern allowing for future database backend flexibility.

## External Dependencies

**Database**: 
- Neon Database serverless PostgreSQL for cloud-hosted database
- Drizzle ORM for database schema management and queries
- PostgreSQL session storage via connect-pg-simple

**UI Components**:
- Radix UI primitives for accessible component foundations
- Embla Carousel for widget carousels
- React Hook Form with Zod validation for form management
- Date-fns for date manipulation

**Development Tools**:
- Vite with React plugin for development server and building
- ESBuild for server-side bundling
- TSX for TypeScript execution in development
- Replit-specific plugins for development environment integration

**Electron Desktop Integration**:
- Complete Electron application with main process (electron/main.js) and preload script (electron/preload.js)
- Global shortcuts for overlay toggle, quick timer, and new widget windows
- System tray functionality with context menu and minimize-to-tray behavior
- Multi-window support for individual widget windows
- Auto-launch on system startup capability
- Desktop notifications for timers and events
- File system access for saving/loading widget data
- Google Calendar API integration structure prepared

## Key Design Patterns

**Component Architecture**: Modular widget system with shared container component and specialized widget implementations.

**Hook-based Logic**: Custom hooks for data fetching, timer management, and settings, promoting code reuse and separation of concerns.

**Type Safety**: Comprehensive TypeScript usage with Zod schemas for runtime validation and database type generation.

**Desktop-First Design**: Native desktop application with Electron integration, optimized for keyboard shortcuts and desktop workflows.

## Running the Application

The application can be started in multiple ways:

1. **Web Development Mode**: `npm run dev` - Starts the web server for development
2. **Electron Development**: `node start-electron.js --dev` - Starts the full Electron app in development mode  
3. **Electron Production**: `node start-electron.js` - Builds and starts the complete desktop application
4. **Manual Build & Start**: `npm run build && npm start` - Traditional web server approach

The main entry point for the desktop application is `start-electron.js` which handles building and launching the Electron app.