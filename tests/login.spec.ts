import { expect } from '@playwright/test';
import test from '@lib/BaseTest';
import { USER } from '../data/users';
import { URLS } from '../data/urls';

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.base);
});

test.describe('Localizify', () => {
  test('C1 Login | Success', async ({ page, headerPage }) => {
    // Arrange
    await headerPage.LOGIN_BUTTON.click();
    await headerPage.verifyModalLoginButton(true);
    await headerPage.INPUT_LOGIN_EMAIL.fill(USER.login);
    await headerPage.INPUT_LOGIN_PASSWORD.fill(USER.password);
    await headerPage.verifyModalLoginButton(false);

    const loginRequestPromise = page.waitForRequest(URLS.login);

    // Act
    await headerPage.LOGIN_MODAL_BUTTON.click();

    // Assert
    // Test login request
    expect((await loginRequestPromise).postData()).toBe(
      `{"email":"${USER.login}","password":"${USER.password}"}`,
    );

    // Test the user is logged
    await expect(headerPage.USER_NAME_DISPLAY).toHaveText(USER.name);
  });

  test('C2 Login | Error | Wrong password', async ({ headerPage }) => {
    // Arrange
    await headerPage.LOGIN_BUTTON.click();
    await headerPage.INPUT_LOGIN_EMAIL.fill(USER.login);
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

  test('C4 Test menu', async ({ headerPage }) => {
    // Arrange
    await headerPage.loginToApplication();

    // Act
    await headerPage.USER_NAME_DISPLAY.hover();
    const menu = headerPage.MENU_DROPDOWN.getByRole('listitem');

    // Assert
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
  });
});
