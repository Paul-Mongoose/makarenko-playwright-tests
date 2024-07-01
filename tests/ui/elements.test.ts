import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { LANGUAGES, MENU_ITEMS, URLS, USER } from '@data/index';
import { getElementColor } from '../../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.base);
});

test.describe('Localizify: test elements', () => {
  test('CE1 Login modal window | Button "Login"', async ({ headerPage }) => {
    // Arrange
    await headerPage.LOGIN_BUTTON.click();
    await headerPage.verifyModalLoginButton(true);

    // Act
    await headerPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await headerPage.INPUT_LOGIN_PASSWORD.fill(USER.password);

    // Assert
    await headerPage.verifyModalLoginButton(false);
  });

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

  test('CE3 Test header menu buttons | Project - button | Hover - change color', async ({
    headerPage,
  }) => {
    // Arrange
    const button = headerPage.PROJECTS_BUTTON;
    const initialColor = await getElementColor(button);

    // Act
    await button.hover();

    // Assert
    await expect
      .poll(
        async () => {
          return await getElementColor(button);
        },
        {
          message: 'Color in hover must be another',
          timeout: 1000,
        },
      )
      .toEqual('rgb(24, 144, 255)');
    expect(initialColor, 'Color before hover must be another').toBe(
      'rgba(0, 0, 0, 0.85)',
    );
  });
});
