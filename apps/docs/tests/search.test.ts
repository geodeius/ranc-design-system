import assert from 'node:assert/strict';
import test from 'node:test';

import { searchIndex } from '../lib/search-filter';
import { getSearchIndex } from '../lib/search';

test('builds one search index from documentation headings and registries', async () => {
  const entries = await getSearchIndex();

  assert.ok(
    entries.some(
      (entry) =>
        entry.kind === 'heading' &&
        entry.title === 'API reference' &&
        entry.url === '/components/button#api-reference',
    ),
  );
  assert.ok(
    entries.some(
      (entry) =>
        entry.kind === 'registry' && entry.title === '@rancard/react-native',
    ),
  );
  assert.equal(
    entries.filter(
      (entry) => entry.url === '/components/button' && entry.title === 'Button',
    ).length,
    1,
  );
});

test('search requires every normalized query term to match', async () => {
  const entries = await getSearchIndex();

  assert.deepEqual(
    searchIndex(entries, 'button accessibility').map((entry) => entry.url),
    ['/components/button#accessibility'],
  );
  assert.deepEqual(searchIndex(entries, 'not-a-real-result'), []);
});

test('every documentation page is represented in the search index', async () => {
  const entries = await getSearchIndex();
  const pageEntries = entries.filter((entry) => entry.kind === 'page');

  assert.equal(pageEntries.length, 8);
  assert.deepEqual(
    pageEntries.map((entry) => entry.url),
    [
      '/getting-started/introduction',
      '/foundations/color',
      '/components/button',
      '/patterns/empty-states',
      '/engineering/architecture',
      '/governance/governance',
      '/releases/release-process',
      '/templates/application-shell',
    ],
  );
});
