import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
  // Go to https://playwright.dev/
  await page.goto('https://playwright.dev/');
  // Click text=Get started
  await page.locator('text=Get started').click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');
});
