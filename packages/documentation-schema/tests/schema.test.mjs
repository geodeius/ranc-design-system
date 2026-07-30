import assert from 'node:assert/strict';
import test from 'node:test';

import {
  componentRegistryEntrySchema,
  componentRegistrySchema,
  getTokenRegistryJsonSchema,
  lifecycleStatusSchema,
  packageRegistryEntrySchema,
  parsePageFrontmatter,
  tokenRegistryEntrySchema,
} from '../dist/index.js';

const sharedPage = {
  title: 'Introduction',
  description: 'An introduction to the Rancard Design System.',
  category: 'getting-started',
  status: 'stable',
  order: 1,
  owners: ['design-systems'],
  lastReviewed: '2026-07-30',
  tags: ['introduction'],
};

test('accepts the canonical lifecycle statuses', () => {
  for (const status of [
    'planned',
    'experimental',
    'alpha',
    'beta',
    'stable',
    'deprecated',
    'removed',
  ]) {
    assert.equal(lifecycleStatusSchema.parse(status), status);
  }

  assert.equal(lifecycleStatusSchema.safeParse('development').success, false);
});

test('parses general, component, and foundation page metadata', () => {
  assert.equal(parsePageFrontmatter(sharedPage).title, 'Introduction');

  const component = parsePageFrontmatter({
    ...sharedPage,
    title: 'Button',
    status: 'planned',
    package: '@rancard/react',
    version: null,
    figmaNode: null,
    accessibilityStatus: 'pending',
    platforms: ['web'],
  });
  assert.equal(component.title, 'Button');

  const foundation = parsePageFrontmatter({
    ...sharedPage,
    title: 'Color',
    status: 'planned',
    tokenGroup: 'color',
    platforms: ['web', 'figma'],
  });
  assert.equal(foundation.title, 'Color');
});

test('returns actionable source and field paths for invalid metadata', () => {
  assert.throws(
    () =>
      parsePageFrontmatter(
        {
          ...sharedPage,
          title: '',
          status: 'development',
        },
        'content/example.mdx',
      ),
    (error) => {
      assert.match(error.message, /Invalid metadata in content\/example\.mdx/);
      assert.match(error.message, /title:/);
      assert.match(error.message, /status:/);
      return true;
    },
  );
});

test('validates the planned registry entry shapes', () => {
  assert.equal(
    componentRegistryEntrySchema.safeParse({
      name: 'button',
      displayName: 'Button',
      category: 'actions',
      status: 'planned',
      packages: { react: '@rancard/react' },
      platforms: ['web'],
      figma: null,
      documentation: '/components/button',
      owners: ['design-systems'],
    }).success,
    true,
  );

  assert.equal(
    packageRegistryEntrySchema.safeParse({
      name: '@rancard/react',
      status: 'planned',
      private: true,
      documentation: null,
      owners: ['design-systems'],
    }).success,
    true,
  );

  assert.equal(
    tokenRegistryEntrySchema.safeParse({
      name: 'example.placeholder',
      group: 'example',
      status: 'planned',
      platforms: ['web'],
      owners: ['design-systems'],
    }).success,
    true,
  );
});

test('rejects duplicate registry names with an actionable path', () => {
  const entry = {
    name: 'button',
    displayName: 'Button',
    category: 'actions',
    status: 'planned',
    packages: { react: '@rancard/react' },
    platforms: ['web'],
    figma: null,
    documentation: '/components/button',
    owners: ['design-systems'],
  };

  const result = componentRegistrySchema.safeParse([entry, entry]);
  assert.equal(result.success, false);
  assert.deepEqual(result.error.issues[0].path, [1, 'name']);
  assert.match(result.error.issues[0].message, /Duplicate registry name/);
});

test('exports the token registry schema for machine consumers', () => {
  const schema = getTokenRegistryJsonSchema();

  assert.equal(schema.type, 'array');
  assert.equal(schema.items.type, 'object');
  assert.deepEqual(schema.items.required, [
    'name',
    'group',
    'status',
    'platforms',
    'owners',
  ]);
});
