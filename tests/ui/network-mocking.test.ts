import test from '@lib/BaseTest';
import { URLS } from '@data/urls.data';
import { expect } from '@playwright/test';
import { mockResponse } from '../../utils/mocking.utils';

test.beforeEach(async ({ mainPage }) => {
  await mainPage.goto();
});

test.describe('Network mocking', async () => {
  test.only('MTC-01 Mocking user info request | 200 | Changing field "Tariff plan"', async ({
    page,
    mainPage,
  }) => {
    // Arrange
    const responseBody = {
      active: false,
      isDateActive: false,
      subscriptionPlan: {
        id: 2,
        isBase: true,
        isPublic: true,
        name: 'Modified response',
        termsLimit: 300,
        apiAccess: false,
        price: 0,
        color: '#3f87f5',
        icon: 'coffee',
        pricesForPeriods: [],
      },
    };
    await mockResponse(page, URLS.getUserInfo, responseBody, 200);

    // Act
    await mainPage.loginAndCheck();

    // Assert
    await page.screenshot({
      path: './screenshots/network-mocking/case-MTC-01.png',
    });
    await expect(mainPage.TARIFF_PLAN_DISPLAY).toHaveText(
      'Tariff plan: Modified response',
    );
  });
});
