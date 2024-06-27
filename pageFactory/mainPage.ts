import { Locator } from '@playwright/test';
import { expect, Page } from '@playwright/test';

export class MainPage {
  H1_TITLE: Locator;

  constructor(page: Page) {
    this.H1_TITLE = page.locator('h1');
  }

  async checkH1Title(title: string) {
    await expect(this.H1_TITLE, 'H1 text must be another').toContainText(title);
  }
}
