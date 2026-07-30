import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
}

test('documentation shell meets the automated accessibility baseline', async ({
  page,
}) => {
  await page.goto('/getting-started/introduction');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test('command palette supports keyboard navigation and restores focus', async ({
  page,
}) => {
  await page.goto('/getting-started/introduction');
  const trigger = page.getByRole('button', { name: /find a page/i });

  await trigger.focus();
  await page.keyboard.press('ControlOrMeta+k');
  const search = page.getByRole('combobox', {
    name: /search documentation pages/i,
  });
  await expect(search).toBeFocused();

  await search.fill('button');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('.command-results a[data-active]')).toContainText(
    'Button',
  );
  await expectNoAccessibilityViolations(page);

  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('mobile navigation and theme controls remain available', async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.goto('/getting-started/introduction');

  await expect(page.getByRole('button', { name: /theme:/i })).toBeVisible();
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(
    page.getByRole('heading', { name: 'Documentation', exact: true }),
  ).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test('registry overview filters remain accessible', async ({ page }) => {
  await page.goto('/components');
  await expect(
    page.getByRole('heading', { name: 'Components', level: 1 }),
  ).toBeVisible();
  await expect(page.getByText('Showing 1 of 1 components.')).toBeVisible();

  await page.getByLabel('Platform').selectOption('web');
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Button' }),
  ).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test('command palette includes package registry metadata', async ({ page }) => {
  await page.goto('/components');
  await page.keyboard.press('ControlOrMeta+k');
  const search = page.getByRole('combobox', {
    name: /search documentation pages/i,
  });
  await search.fill('@rancard/react-native');

  await expect(page.locator('.command-results a[data-active]')).toContainText(
    '@rancard/react-native',
  );
});
