import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { URLS, LANGUAGES, MENU_ITEMS } from '@data/index';

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.base);
});

test.describe('Localizify: test elements', () => {
  test('CE1 Test profile menu list', async ({ page, headerPage }) => {
    // Arrange
    await headerPage.loginToApplication();

    // Act
    await headerPage.USER_NAME_DISPLAY.hover();
    await page.screenshot({ path: 'example.png' });

    // Assert
    const menu = headerPage.MENU_DROPDOWN.getByRole('listitem');
    await expect(menu).toHaveCount(8);
    await expect(menu).toContainText(Object.values(MENU_ITEMS.EN));
  });

  test('CE2 Test localization list', async ({ headerPage }) => {
    // Act
    await headerPage.LANGUAGE_BUTTON.click();

    // Assert
    const menu = headerPage.MENU_DROPDOWN.getByRole('listitem');
    await expect(menu).toHaveCount(3);
    await expect(menu).toContainText(Object.values(LANGUAGES));
  });
});
