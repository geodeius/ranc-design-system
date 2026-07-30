import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getComponentRegistry,
  getPackageRegistry,
  getRegistrySearchEntries,
  getTokenRegistry,
  validateRegistryRelationships,
} from '../lib/registries';

test('loads the authoritative registries', async () => {
  const [components, packages, tokens] = await Promise.all([
    getComponentRegistry(),
    getPackageRegistry(),
    getTokenRegistry(),
  ]);

  assert.deepEqual(
    components.map((entry) => entry.name),
    ['button'],
  );
  assert.equal(packages.length, 10);
  assert.deepEqual(tokens, []);
});

test('registry relationships match documentation and package manifests', async () => {
  await assert.doesNotReject(validateRegistryRelationships());
});

test('registry metadata contributes searchable entries', async () => {
  const searchEntries = await getRegistrySearchEntries();

  assert.ok(searchEntries.some((entry) => entry.title === 'Button'));
  assert.ok(searchEntries.some((entry) => entry.title === '@rancard/react'));
});
