import { Locator } from 'playwright-core';
import { APIResponse } from '@playwright/test';
import { IResponse } from '@interfaces/ICommon';

export async function parseResponse(response: APIResponse): Promise<IResponse> {
  return {
    status: response.status(),
    body: await response.json(),
    url: response.url(),
    headers: response.headers(),
  };
}

export async function getElementColor(locator: Locator) {
  return await locator.evaluate((el) => window.getComputedStyle(el).color);
}
