import { expect } from '@playwright/test';
import test from '@lib/BaseTest';

test.beforeAll(async ({ page, headerPage }) => {
  await page.goto('https://localizify.com');
  await headerPage.loginToApplication();
});

test.describe('Localizify: test elements', () => {
  test('C4 Test menu', async ({ page, headerPage }) => {
    await headerPage.USER_NAME_DISPLAY.hover();

    await page.screenshot({ path: 'example.png' });
    const menu = headerPage.MENU_DROPDOWN.getByRole('listitem');
    await expect(menu).toHaveCount(8);
    await expect(menu).toContainText([
      'My profile',
      'AT Balance',
      'Orders',
      'Statistics',
      'Special tariffs',
      'Settings',
      'Logout',
    ]);

    // Test login request
    // Test user name in header after login
  });
});
