import { Page, expect } from '@playwright/test';
import { Locator } from 'playwright-core';
import { LOCALIZATION } from '@data/enums.data';

abstract class Assert {
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

export abstract class Component extends Assert {
  constructor(protected page: Page) {
    super();
  }
}

export abstract class BasePage extends Assert {
  constructor(protected page: Page) {
    super();
  }

  async goto() {
    console.log('This function must be overridden for page');
  }
}
