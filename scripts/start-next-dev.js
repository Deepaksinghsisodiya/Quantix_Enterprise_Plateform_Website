import { execSync } from 'node:child_process';
import { platform } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'http://localhost:3000';

function openBrowser(target) {
  const platformName = platform();
  try {
    if (platformName === 'win32') {
      execSync(`start "" "${target}"`, { stdio: 'ignore' });
    } else if (platformName === 'darwin') {
      execSync(`open "${target}"`, { stdio: 'ignore' });
    } else {
      execSync(`xdg-open "${target}"`, { stdio: 'ignore' });
    }
  } catch {
    // ignore if open command fails; next dev will still start
  }
}

openBrowser(url);
execSync('next dev --webpack', { stdio: 'inherit', cwd: __dirname + '/../' });
