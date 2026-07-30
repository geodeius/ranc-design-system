import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Vercel deploys only the documentation application through Turborepo', async () => {
  const config = JSON.parse(await readFile('apps/docs/vercel.json', 'utf8'));

  assert.equal(config.framework, 'nextjs');
  assert.equal(
    config.buildCommand,
    'cd ../.. && pnpm turbo run build --filter=@rancard/docs',
  );
  assert.equal('env' in config, false);
  assert.equal('builds' in config, false);
});
