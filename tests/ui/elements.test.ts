import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { LANGUAGES, MENU_ITEMS, USER } from '@data/index';
import { getElementColor } from '../../utils';

test.beforeEach(async ({ mainPage }) => {
  await mainPage.goto();
});

test.describe('Localizify: test elements', () => {
  test('CE0 Login modal window | Button "Login"', async ({ mainPage }) => {
    // Arrange
    await mainPage.LOGIN_BUTTON.click();
    await mainPage.verifyModalLoginButton(true);

    // Act
    await mainPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.INPUT_LOGIN_PASSWORD.fill(USER.password);

    // Assert
    await mainPage.verifyModalLoginButton(false);
  });

  test('CE1 Test profile menu list', async ({ mainPage }) => {
    // Arrange
    await mainPage.loginToApplication();

    // Act
    await mainPage.USER_NAME_DISPLAY.hover();

    // Assert
    const menu = mainPage.HEADER_MENU_DROPDOWN;
    await expect(menu).toHaveCount(8);
    await expect(menu).toContainText(Object.values(MENU_ITEMS.EN));
  });

  test('CE2 Test localization list', async ({ mainPage }) => {
    // Act
    await mainPage.LANGUAGE_BUTTON.click();

    // Assert
    const menu = mainPage.HEADER_MENU_DROPDOWN;
    await expect(menu).toHaveCount(3);
    await expect(menu).toContainText(Object.values(LANGUAGES));
  });

  test('CE3 Test header menu buttons | Project - button | Hover - change color', async ({
    mainPage,
  }) => {
    // Arrange
    const button = mainPage.PROJECTS_BUTTON;
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
