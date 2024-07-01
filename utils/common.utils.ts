import { Locator } from 'playwright-core';

export async function getElementColor(locator: Locator) {
  return await locator.evaluate((el) => window.getComputedStyle(el).color);
}
