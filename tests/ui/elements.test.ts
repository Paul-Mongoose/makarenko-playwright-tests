import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { LANGUAGES, MENU_ITEMS, USER } from '@data/index';
import { getElementColor } from '../../utils';

test.beforeEach(async ({ mainPage }) => {
  await mainPage.goto();
});

test.describe('Localizify: test elements', () => {
  test('CE-0 Login modal window | Button "Login"', async ({ mainPage }) => {
    // Arrange
    await mainPage.header.LOGIN_BUTTON.click();
    await mainPage.header.verifyModalLoginButton(true);

    // Act
    await mainPage.header.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.header.INPUT_LOGIN_PASSWORD.fill(USER.password);

    // Assert
    await mainPage.header.HEADER_LOGIN_MODAL.screenshot({
      path: './screenshots/elements/case-CE-0.png',
    });
    await mainPage.header.verifyModalLoginButton(false);
  });

  test('CE1 Test profile menu list', async ({ mainPage }) => {
    // Arrange
    await mainPage.header.loginToApplication();

    // Act
    await mainPage.header.USER_NAME_DISPLAY.hover();

    // Assert
    const menuDropdown = mainPage.header.HEADER_MENU_DROPDOWN;
    await expect(menuDropdown).toHaveCount(8);
    await expect(menuDropdown).toContainText(Object.values(MENU_ITEMS.EN));
  });

  test('CE-2 Test localization list', async ({ mainPage }) => {
    // Act
    await mainPage.header.LANGUAGE_BUTTON.click();

    // Assert
    const menuDropdown = mainPage.header.HEADER_MENU_DROPDOWN;
    await expect(menuDropdown).toHaveCount(3);
    await expect(menuDropdown).toContainText(Object.values(LANGUAGES));
  });

  test('CE-3 Test header menu buttons | Project - button | Hover - change color', async ({
    mainPage,
  }) => {
    // Arrange
    const projectButton = mainPage.header.PROJECTS_BUTTON;
    const initialColor = await getElementColor(projectButton);

    // Act
    await projectButton.hover();

    // Assert
    await expect
      .poll(
        async () => {
          return await getElementColor(projectButton);
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
