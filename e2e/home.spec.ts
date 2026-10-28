import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('renders the default app text', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.status()).toBe(200);

    await expect(page.getByText('Default App', { exact: true })).toBeVisible();
  });
});
