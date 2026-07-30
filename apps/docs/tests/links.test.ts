import assert from 'node:assert/strict';
import test from 'node:test';

import {
  extractInternalLinks,
  validateInternalLinks,
  validateInternalTargets,
} from '../lib/links';

test('extracts root-relative and same-page links without external URLs', () => {
  assert.deepEqual(
    extractInternalLinks(
      '[Button](/components/button) [API](#api-reference) [GitHub](https://github.com)',
    ),
    ['/components/button', '#api-reference'],
  );
});

test('reports missing internal routes and anchors with their source', () => {
  assert.deepEqual(
    validateInternalTargets(
      [
        { source: '/components/button', target: '/components/button' },
        { source: '/components/button', target: '/missing#heading' },
      ],
      new Set(['/components/button']),
    ),
    ['/components/button references missing internal target /missing#heading.'],
  );
});

test('validated content and registry relationships contain no broken links', async () => {
  assert.deepEqual(await validateInternalLinks(), []);
});
