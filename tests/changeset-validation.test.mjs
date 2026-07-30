import assert from 'node:assert/strict';
import test from 'node:test';

import {
  changedPublishablePackages,
  hasChangeset,
} from '../scripts/validate-changesets.mjs';

const packages = [
  { name: '@rancard/react', path: 'packages/react', private: false },
  { name: '@rancard/tokens', path: 'packages/tokens', private: true },
];

test('requires release intent only for changed publishable packages', () => {
  assert.deepEqual(
    changedPublishablePackages(['packages/react/src/index.ts'], packages),
    ['@rancard/react'],
  );
  assert.deepEqual(
    changedPublishablePackages(['packages/tokens/src/index.ts'], packages),
    [],
  );
});

test('recognizes authored changesets but not repository guidance', () => {
  assert.equal(hasChangeset(['.changeset/README.md']), false);
  assert.equal(hasChangeset(['.changeset/quiet-rivers-flow.md']), true);
});
