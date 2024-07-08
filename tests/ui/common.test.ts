import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { LANGUAGES, USER, MAIN_PAGE_H1_TEXT, URLS } from '@data/index';

test.beforeEach(async ({ mainPage }) => {
  await mainPage.goto();
});

test.describe('Localizify common tests', () => {
  test('C1 Login | Success', async ({ page, mainPage }) => {
    // Arrange
    await mainPage.LOGIN_BUTTON.click();
    await mainPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.INPUT_LOGIN_PASSWORD.fill(USER.password);
    const loginRequestPromise = page.waitForRequest(URLS.login);

    // Act
    await mainPage.LOGIN_MODAL_BUTTON.click();

    // Assert
    // Test login api request
    expect((await loginRequestPromise).postData()).toBe(
      `{"email":"${USER.email}","password":"${USER.password}"}`,
    );

    // Test the user is logged
    await expect(mainPage.USER_NAME_DISPLAY).toHaveText(USER.name);
  });

  test('C2 Login | Error | Wrong password', async ({ mainPage }) => {
    // Arrange
    await mainPage.LOGIN_BUTTON.click();
    await mainPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await mainPage.INPUT_LOGIN_PASSWORD.fill('1234567');

    // Act
    await mainPage.LOGIN_MODAL_BUTTON.click();

    // Assert
    await expect(mainPage.LOGIN_MODAL_ERROR_MESSAGE).toHaveText(
      'Wrong login or password',
    );
    await expect(mainPage.LOGIN_MODAL_ERROR_DESCRIPTION).toHaveText(
      'Check the entered data or go to password recovery',
    );
  });

  test('C3 Logout', async ({ mainPage }) => {
    // Arrange
    await mainPage.loginToApplication();
    await mainPage.USER_NAME_DISPLAY.hover();

    // Act
    await mainPage.MENU_LOGOUT_BUTTON.click();

    // Assert
    await expect(mainPage.LOGIN_BUTTON).toBeEnabled();
  });

  test('C4 Change localization | ENG -> UK', async ({ mainPage }) => {
    // Arrange
    await mainPage.languageButtonClick();
    await mainPage.checkH1Title(MAIN_PAGE_H1_TEXT.EN);

    // Act
    await mainPage.HEADER_MENU_DROPDOWN.filter({
      hasText: LANGUAGES.UK,
    }).click();

    // Assert
    await mainPage.checkH1Title(MAIN_PAGE_H1_TEXT.UK);
  });
});
