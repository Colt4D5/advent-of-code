import { readFileSync } from 'fs';

export async function readInput(path) {
  return readFileSync(path, { encoding: 'utf8', flag: 'r' });
}