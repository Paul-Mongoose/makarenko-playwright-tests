import { Page } from '@playwright/test';

export async function mockResponse(
  page: Page,
  urlPattern: string,
  body: object,
  statusCode: number,
) {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}
