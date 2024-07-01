import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { LANGUAGES, USER, MAIN_PAGE_H1_TEXT, URLS } from '@data/index';

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.base);
});

test.describe('Localizify common tests', () => {
  test('C1 Login | Success', async ({ page, headerPage }) => {
    // Arrange
    await headerPage.LOGIN_BUTTON.click();
    await headerPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await headerPage.INPUT_LOGIN_PASSWORD.fill(USER.password);
    const loginRequestPromise = page.waitForRequest(URLS.login);

    // Act
    await headerPage.LOGIN_MODAL_BUTTON.click();

    // Assert
    // Test login api request
    expect((await loginRequestPromise).postData()).toBe(
      `{"email":"${USER.email}","password":"${USER.password}"}`,
    );

    // Test the user is logged
    await expect(headerPage.USER_NAME_DISPLAY).toHaveText(USER.name);
  });

  test('C2 Login | Error | Wrong password', async ({ headerPage }) => {
    // Arrange
    await headerPage.LOGIN_BUTTON.click();
    await headerPage.INPUT_LOGIN_EMAIL.fill(USER.email);
    await headerPage.INPUT_LOGIN_PASSWORD.fill('1234567');

    // Act
    await headerPage.LOGIN_MODAL_BUTTON.click();

    // Assert
    await expect(headerPage.LOGIN_MODAL_ERROR_MESSAGE).toHaveText(
      'Wrong login or password',
    );
    await expect(headerPage.LOGIN_MODAL_ERROR_DESCRIPTION).toHaveText(
      'Check the entered data or go to password recovery',
    );
  });

  test('C3 Logout', async ({ headerPage }) => {
    // Arrange
    await headerPage.loginToApplication();
    await headerPage.USER_NAME_DISPLAY.hover();

    // Act
    await headerPage.MENU_LOGOUT_BUTTON.click();

    // Assert
    await expect(headerPage.LOGIN_BUTTON).toBeEnabled();
  });

  test('C4 Change localization | ENG -> UK', async ({
    headerPage,
    mainPage,
    page,
  }) => {
    // Arrange
    await headerPage.languageButtonClick();
    await page.screenshot({ path: 'example.png' });
    await mainPage.checkH1Title(MAIN_PAGE_H1_TEXT.EN);

    // Act
    await headerPage.MENU_DROPDOWN.getByRole('listitem')
      .filter({ hasText: LANGUAGES.UK })
      .click();

    await page.screenshot({ path: 'example.png' });

    // Assert
    await mainPage.checkH1Title(MAIN_PAGE_H1_TEXT.UK);
  });
});
