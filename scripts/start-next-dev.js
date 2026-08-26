import { spawn } from 'node:child_process';
import { platform } from 'node:os';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const url = `http://localhost:${PORT}`;

function openBrowser(target) {
  const platformName = platform();
  try {
    if (platformName === 'win32') {
      spawn('cmd.exe', ['/c', 'start', '', target], { stdio: 'ignore', detached: true }).unref();
    } else if (platformName === 'darwin') {
      spawn('open', [target], { stdio: 'ignore', detached: true }).unref();
    } else {
      spawn('xdg-open', [target], { stdio: 'ignore', detached: true }).unref();
    }
  } catch {
    // ignore
  }
}

let opened = false;
function tryOpen() {
  if (opened) return;
  opened = true;
  openBrowser(url);
}

function checkServerReady() {
  const req = http.get(url, () => {
    tryOpen();
  });
  req.on('error', () => {
    if (!opened) {
      setTimeout(checkServerReady, 300);
    }
  });
  req.setTimeout(800, () => {
    req.destroy();
  });
}

// Start polling for server ready
setTimeout(checkServerReady, 400);

// Fallback timer: ensure browser opens even if polling encounters edge cases
setTimeout(() => {
  tryOpen();
}, 3500);

// Start next dev server on port 3000
const child = spawn(`next dev -p ${PORT} --webpack`, {
  shell: true,
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
