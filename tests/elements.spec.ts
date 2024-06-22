import {expect} from '@playwright/test';
import test from '@lib/BaseTest';

test.beforeAll(async ({page, header}) => {
    await page.goto('https://localizify.com');
    await header.loginToApplication();
},);

test.describe('Localizify: test elements', () => {
    
    test('C4 Test menu', async ({page, header}) => {
   
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


        // Test login request
        // Test user name in header after login

    });
});