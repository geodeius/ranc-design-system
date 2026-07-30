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

  assert.equal(pages.length, 8);
  assert.deepEqual(
    pages.map((page) => page.frontmatter.title),
    [
      'Introduction',
      'Color',
      'Button',
      'Empty States',
      'Architecture',
      'Governance',
      'Release Process',
      'Application Shell',
    ],
  );
});

test('derives routes, breadcrumbs, headings, and navigation from metadata', async () => {
  const page = await getPage(['components', 'button']);
  assert.ok(page);
  assert.equal(page.url, '/components/button');
  assert.equal(page.breadcrumbs.at(-1)?.label, 'Button');
  const headings = page.tableOfContents.map((heading) => heading.id);
  for (const requiredHeading of [
    'overview',
    'when-to-use',
    'behavior',
    'accessibility',
    'responsive-behavior',
    'api-reference',
    'figma-guidance',
    'known-limitations',
    'changelog',
  ]) {
    assert.ok(
      headings.includes(requiredHeading),
      `Button template is missing ${requiredHeading}.`,
    );
  }

  const navigation = await getNavigation();
  assert.deepEqual(
    navigation.map((group) => group.label),
    [
      'Getting Started',
      'Foundations',
      'Components',
      'Patterns',
      'Engineering',
      'Governance',
      'Releases',
      'Templates',
    ],
  );
});

test('representative placeholder sections remain clearly labeled', async () => {
  const pages = await getAllPages();
  const placeholderPages = pages.filter(
    (page) => page.frontmatter.status === 'planned',
  );

  for (const page of placeholderPages) {
    assert.match(
      page.body,
      /\*\*Placeholder\*\*/,
      `${page.url} must identify itself as a placeholder.`,
    );
  }
});

test('derives previous and next links from validated page order', async () => {
  const adjacent = await getAdjacentPages(['foundations', 'color']);

  assert.equal(adjacent.previous?.frontmatter.title, 'Introduction');
  assert.equal(adjacent.next?.frontmatter.title, 'Button');
});
