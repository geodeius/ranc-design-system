import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getAdjacentPages,
  getAllPages,
  getNavigation,
  getPage,
} from '../lib/content';

test('loads and validates every MDX page', async () => {
  const pages = await getAllPages();

  assert.equal(pages.length, 3);
  assert.deepEqual(
    pages.map((page) => page.frontmatter.title),
    ['Introduction', 'Color', 'Button'],
  );
});

test('derives routes, breadcrumbs, headings, and navigation from metadata', async () => {
  const page = await getPage(['components', 'button']);
  assert.ok(page);
  assert.equal(page.url, '/components/button');
  assert.equal(page.breadcrumbs.at(-1)?.label, 'Button');
  assert.deepEqual(
    page.tableOfContents.map((heading) => heading.id),
    ['current-status', 'documentation-contract'],
  );

  const navigation = await getNavigation();
  assert.deepEqual(
    navigation.map((group) => group.label),
    ['Getting Started', 'Foundations', 'Actions'],
  );
});

test('derives previous and next links from validated page order', async () => {
  const adjacent = await getAdjacentPages(['foundations', 'color']);

  assert.equal(adjacent.previous?.frontmatter.title, 'Introduction');
  assert.equal(adjacent.next?.frontmatter.title, 'Button');
});
