import { expect } from '@playwright/test';
import { Locator } from 'playwright-core';
import { LOCALIZATION } from '@data/enums.data';

export abstract class Assert {
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
