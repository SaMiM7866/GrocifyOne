import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

const queues = new Map();

export async function readCollection(name) {
  const filePath = path.join(dataDir, `${name}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw error;
  }
}

export async function writeCollection(name, data) {
  const previous = queues.get(name) || Promise.resolve();
  const next = previous.then(async () => {
    const filePath = path.join(dataDir, `${name}.json`);
    const temporary = `${filePath}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(data, null, 2));
    await fs.rename(temporary, filePath);
  });
  queues.set(name, next.catch(() => {}));
  return next;
}
