import { expect, test } from '@playwright/test';

const coreRoutes = [
  '/',
  '/getting-started/introduction',
  '/foundations/color',
  '/components',
  '/components/button',
  '/components/category/actions',
  '/patterns/empty-states',
  '/engineering/architecture',
  '/governance/governance',
  '/releases/release-process',
  '/templates/application-shell',
  '/packages',
  '/tokens',
];

test('core routes respond successfully without horizontal page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });

  for (const route of coreRoutes) {
    const response = await page.goto(route);
    expect(response?.ok(), `${route} must return a successful response`).toBe(
      true,
    );
    await expect(page.locator('body')).toBeVisible();
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(
      overflow,
      `${route} must not overflow at 320 CSS pixels`,
    ).toBeLessThanOrEqual(1);
  }
});

test('generated AI artifacts are deployable public assets', async ({
  page,
}) => {
  for (const asset of [
    '/ai/component-registry.json',
    '/ai/navigation.json',
    '/ai/search-index.json',
    '/ai/token-schema.json',
    '/ai/design-system-summary.md',
    '/ai/contribution-rules.md',
  ]) {
    const response = await page.request.get(asset);
    expect(response.ok(), `${asset} must be publicly available`).toBe(true);
  }
});

test('documentation shell stays within the Phase Zero performance budget', async ({
  page,
}) => {
  await page.goto('/components/button');

  const metrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType(
      'resource',
    ) as PerformanceResourceTiming[];
    return {
      domElements: document.querySelectorAll('*').length,
      scriptBytes: resources
        .filter((resource) => resource.initiatorType === 'script')
        .reduce(
          (total, resource) =>
            total + (resource.encodedBodySize || resource.transferSize),
          0,
        ),
    };
  });

  expect(metrics.domElements).toBeLessThan(1_200);
  expect(metrics.scriptBytes).toBeLessThan(750_000);
});
