import { expect, Page } from '@playwright/test';
import { Locator } from 'playwright-core';
import { LOCALIZATION } from '@data/enums.data';

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    console.log('This function must be overridden for page');
  }

  async checkTextContain(
    locator: Locator,
    expectedTitle: string,
    message?: string,
  ) {
    await expect(
      locator,
      message ? message : `This element must have another text`,
    ).toContainText(expectedTitle);
  }

  async checkLocalization(
    localization: LOCALIZATION,
    locator: Locator,
  ): Promise<void> {
    console.log(
      `This function must check ${localization} in locator ${locator} be overridden for page`,
    );
  }
}
