// Main entry point for Electron application (CommonJS version)
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Keep a global reference of the window object
let mainWindow;
let serverProcess = null;

// Check if we're in development mode
const isDev = true; // Always use development mode for now

const PORT = 5000;
const SERVER_URL = `http://localhost:${PORT}`;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    show: false,
    backgroundColor: '#0F172A'
  });

  // Wait for server to be ready, then load the app
  checkServerAndLoad();

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('ModMenu Pro is ready!');
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function checkServerAndLoad() {
  const checkUrl = () => {
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/',
      method: 'GET',
      timeout: 1000
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('Server is ready, loading application...');
        mainWindow.loadURL(SERVER_URL);
      } else {
        setTimeout(checkUrl, 1000);
      }
    });

    req.on('error', () => {
      setTimeout(checkUrl, 1000);
    });

    req.on('timeout', () => {
      req.destroy();
      setTimeout(checkUrl, 1000);
    });

    req.end();
  };

  checkUrl();
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

console.log('ModMenu Pro Electron starting...');
console.log('Make sure the development server is running with: npm run dev');