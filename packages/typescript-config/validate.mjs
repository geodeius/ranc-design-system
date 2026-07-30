import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';

const config = JSON.parse(
  await readFile(new URL('./base.json', import.meta.url), 'utf8'),
);

if (config.compilerOptions?.strict !== true) {
  throw new Error(
    'The shared TypeScript configuration must enable strict mode.',
  );
}
