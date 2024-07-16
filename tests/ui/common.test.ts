import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import {
  HEADER_BUTTONS,
  LANGUAGES,
  LOCALIZATION,
  URLS,
  USER,
} from '@data/index';

test.beforeEach(async ({ mainPage }) => {
  await mainPage.goto();
});

test.describe('Localizify common tests', () => {
  test('C1 Login | Success', async ({ page, mainPage }) => {
    // Arrange
    await mainPage.header.LOGIN_BUTTON.click();
    await mainPage.header.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.header.INPUT_LOGIN_PASSWORD.fill(USER.password);
    const loginRequestPromise = page.waitForRequest(URLS.login);

    // Act
    await mainPage.header.LOGIN_MODAL_BUTTON.click();

    // Assert
    // Test login api request
    expect((await loginRequestPromise).postData()).toBe(
      `{"email":"${USER.email}","password":"${USER.password}"}`,
    );

    // Test the user is logged
    await expect(mainPage.header.USER_NAME_DISPLAY).toHaveText(USER.name);
  });

  test('C2 Login | Error | Wrong password', async ({ mainPage }) => {
    // Arrange
    await mainPage.header.LOGIN_BUTTON.click();
    await mainPage.header.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.header.INPUT_LOGIN_PASSWORD.fill('1234567');

    // Act
    await mainPage.header.LOGIN_MODAL_BUTTON.click();

    // Assert
    await expect(mainPage.header.LOGIN_MODAL_ERROR_MESSAGE).toHaveText(
      'Wrong login or password',
    );
    await expect(mainPage.header.LOGIN_MODAL_ERROR_DESCRIPTION).toHaveText(
      'Check the entered data or go to password recovery',
    );
  });

  test('C3 Logout', async ({ mainPage }) => {
    // Arrange
    await mainPage.header.loginToApplication();
    await mainPage.header.USER_NAME_DISPLAY.hover();

    // Act
    await mainPage.header.MENU_LOGOUT_BUTTON.click();

    // Assert
    await expect(mainPage.header.LOGIN_BUTTON).toBeEnabled();
  });

  test('C4 Change localization | ENG -> UK', async ({ mainPage }) => {
    // Arrange
    await mainPage.header.languageButtonClick();
    await mainPage.header.checkTextContain(
      mainPage.header.PROJECTS_BUTTON,
      HEADER_BUTTONS.PROJECTS.EN,
      'Header button PROJECTS mus have another title',
    );

    // Act
    await mainPage.header.HEADER_MENU_DROPDOWN.filter({
      hasText: LANGUAGES.UK,
    }).click();

    // Assert
    await mainPage.header.checkLocalization(LOCALIZATION.UK);
    await mainPage.checkLocalization(LOCALIZATION.UK);
  });
});
