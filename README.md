# ModMenu Pro

A powerful desktop productivity application built with Electron, React, and Express. Create and manage widgets for timers, text editing, calendars, and mind maps with global shortcuts and overlay functionality.

## Features

- 🎯 **Global Overlay Mode** - Access your productivity tools from anywhere
- ⚡ **Global Shortcuts** - Quick access with customizable keyboard shortcuts
- 🪟 **Multi-Window Support** - Open widgets in separate windows
- ⏰ **Timer/Stopwatch Widget** - Pomodoro timers and custom timers
- 📝 **Text Editor Widget** - Rich text editing with highlighting
- 📅 **Calendar Widget** - Google Calendar integration
- 🧠 **Mind Map Widget** - Visual brainstorming and idea mapping
- 🌙 **Dark Theme** - Easy on the eyes design
- 💾 **Auto-Save** - Never lose your work
- 🔔 **Desktop Notifications** - Stay informed of important events

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modmenu-pro
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode

For development with hot reload:

```bash
# Start web server only
npm run dev

# Start Electron app in development mode
node start-electron.js --dev
```

#### Production Mode

To build and run the complete Electron application:

```bash
# Build and start Electron app
node start-electron.js
```

#### Alternative Commands

```bash
# Build the web application
npm run build

# Start production server only
npm start

# Run Electron directly (requires server to be running)
cd electron && npm start
```

## Project Structure

```
modmenu-pro/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Application pages
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── electron/              # Electron main process
│   ├── main.js           # Electron main process
│   ├── preload.js        # Preload script for security
│   └── assets/           # Application icons
├── shared/               # Shared types and schemas
└── start-electron.js     # Application launcher
```

## Global Shortcuts

The application supports the following global shortcuts:

- `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac) - Toggle main overlay
- `Ctrl+Shift+T` (or `Cmd+Shift+T` on Mac) - Create quick timer
- `Ctrl+Shift+W` (or `Cmd+Shift+W` on Mac) - Open new widget window

## Widget Types

### Timer/Stopwatch
- Pomodoro timer with 25/5/15 minute presets
- Custom duration timers
- Session tracking and notifications

### Text Editor
- Rich text editing with word count
- Text highlighting in multiple colors
- Auto-save functionality
- Export capabilities

### Calendar
- Google Calendar integration
- Monthly view with event display
- Event creation and management
- Desktop notifications for events

### Mind Map
- Visual node-based mind mapping
- Drag and drop node positioning
- Connection lines between ideas
- Save and load mind map files

## System Integration

### Auto-Launch
Set the application to start automatically when your system boots.

### System Tray
The application can minimize to the system tray for quick access without cluttering your taskbar.

### Desktop Notifications
Receive notifications for timer completions, calendar events, and other important updates.

## Development

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Express.js, TypeScript
- **Desktop**: Electron
- **State Management**: TanStack Query
- **Database**: In-memory storage (configurable for PostgreSQL)
- **Build Tools**: Vite, esbuild

### Adding New Widgets

1. Create a new widget component in `client/src/components/widgets/`
2. Add the widget type to the shared schema in `shared/schema.ts`
3. Implement storage methods in `server/storage.ts`
4. Add API routes in `server/routes.ts`
5. Register the widget in the main application

### API Endpoints

- `GET /api/widgets` - Get all widgets
- `POST /api/widgets` - Create a new widget
- `PATCH /api/widgets/:id` - Update a widget
- `DELETE /api/widgets/:id` - Delete a widget
- `GET/POST /api/settings` - Manage application settings
- Widget-specific endpoints for timers, documents, mind maps, and calendar events

## Building for Distribution

To create distributable packages:

```bash
# Install electron-builder
npm install -g electron-builder

# Build the web application
npm run build

# Create Electron distributables
cd electron
npm run dist
```

This will create platform-specific installers in the `electron/dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.