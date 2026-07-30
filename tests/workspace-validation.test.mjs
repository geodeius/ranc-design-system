import assert from 'node:assert/strict';
import test from 'node:test';

import {
  expectedWorkspaces,
  validateManifest,
  validateWorkspace,
} from '../scripts/validate-workspace.mjs';

test('the repository contains exactly the planned Phase 1 workspaces', async () => {
  assert.deepEqual(await validateWorkspace(), []);
  assert.equal(expectedWorkspaces.length, 12);
});

test('workspace packages must remain private planned placeholders', () => {
  const errors = validateManifest('packages/example', {
    dependencies: { '@rancard/tokens': '^1.0.0' },
    exports: { '.': './dist/index.js' },
    private: false,
    rancard: { status: 'stable' },
  });

  assert.deepEqual(errors, [
    'packages/example must remain private during Phase Zero',
    'packages/example must have the planned lifecycle status',
    'packages/example dependencies.@rancard/tokens must use the workspace protocol',
  ]);
});
