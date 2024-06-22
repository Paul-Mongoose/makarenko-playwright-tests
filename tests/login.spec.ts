import {expect} from '@playwright/test';
import test from '@lib/BaseTest';
import {USER} from "../data/users";
import {URLS} from "../data/urls";

test.beforeEach(async ({page}) => {
    await page.goto('https://localizify.com');
},);

test.describe('Localizify', () => {

    test('C1 Login | Success', async ({page, header}) => {
        // Arrange
        await header.LOGIN_BUTTON.click();
        await header.verifyModalLoginButton(true);
        await header.INPUT_LOGIN_EMAIL.fill(USER.login);
        await header.INPUT_LOGIN_PASSWORD.fill(USER.password);
        await header.verifyModalLoginButton(false);

        const loginRequestPromise = page.waitForRequest(URLS.login);

        // Act
        await header.LOGIN_MODAL_BUTTON.click();

        // Assert
        // Test login request
        expect((await loginRequestPromise).postData()).toBe(`{"email":"${USER.login}","password":"${USER.password}"}`);

        // Test the user is logged
        await expect(header.USER_NAME_DISPLAY).toHaveText(USER.name);
    });

    test('C2 Login | Error | Wrong password', async ({ header}) => {
        // Arrange
        await header.LOGIN_BUTTON.click();
        await header.INPUT_LOGIN_EMAIL.fill(USER.login);
        await header.INPUT_LOGIN_PASSWORD.fill("1234567");

        // Act
        await header.LOGIN_MODAL_BUTTON.click();

        // Assert
        await expect(header.LOGIN_MODAL_ERROR_MESSAGE).toHaveText("Wrong login or password");
        await expect(header.LOGIN_MODAL_ERROR_DESCRIPTION).toHaveText("Check the entered data or go to password recovery");

    });

    test('C3 Logout', async ({ header}) => {
        // Arrange
        await header.loginToApplication();
        await header.USER_NAME_DISPLAY.hover();

        // Act
        await header.MENU_LOGOUT_BUTTON.click();

        // Assert
        await expect(header.LOGIN_BUTTON).toBeEnabled();
    });

    test('C4 Test menu', async ({page, header}) => {
        await header.loginToApplication();
        await header.USER_NAME_DISPLAY.hover();

        await page.screenshot({path: 'example.png'});
        const menu = header.MENU_DROPDOWN.getByRole('listitem')
        await expect(menu).toHaveCount(8);
        await expect(menu).toContainText([ 'My profile',
            'AT Balance',
            'Orders',
            'Statistics',
            'Special tariffs',
            'Settings',
            'Logout'
        ]);
    });
});