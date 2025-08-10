// Main entry point for Electron application
// This file loads the actual main process from the electron directory

import path from 'path';
import { spawn } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

console.log('Starting ModMenu Pro...');

if (isDev) {
  console.log('Development mode detected');
  
  // Start the web server first
  const serverProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true
  });

  let serverStarted = false;

  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`Server: ${output.trim()}`);
    
    // Once server is ready, load the actual Electron main process
    if (output.includes('serving on port') && !serverStarted) {
      serverStarted = true;
      console.log('Server ready, loading Electron...');
      require('./electron/main.js');
    }
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });

} else {
  // In production, just load the main process
  // (assumes server is built and will be started by main process)
  require('./electron/main.js');
}