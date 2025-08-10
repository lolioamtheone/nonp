#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting ModMenu Pro Electron App...\n');

// Check if we're in development or production mode
const isDev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';

async function startApp() {
  if (isDev) {
    console.log('📦 Development Mode: Starting web server...');
    
    // Start the web server in development mode
    const serverProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`Server: ${output.trim()}`);
      
      // Start Electron when server is ready
      if (output.includes('serving on port')) {
        console.log('\n🎯 Server ready! Starting Electron...\n');
        startElectron();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });

  } else {
    console.log('🏗️  Production Mode: Building application...');
    
    // Build the application first
    const buildProcess = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      shell: true
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('\n✅ Build complete! Starting Electron...\n');
        startElectron();
      } else {
        console.error(`❌ Build failed with exit code ${code}`);
        process.exit(1);
      }
    });
  }
}

function startElectron() {
  const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
  const mainPath = path.join(__dirname, 'electron', 'main.js');
  
  const electronProcess = spawn(electronPath, [mainPath], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: isDev ? 'development' : 'production'
    }
  });

  electronProcess.on('close', (code) => {
    console.log(`\n📱 Electron process exited with code ${code}`);
    process.exit(code);
  });
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down ModMenu Pro...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down ModMenu Pro...');
  process.exit(0);
});

startApp().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});