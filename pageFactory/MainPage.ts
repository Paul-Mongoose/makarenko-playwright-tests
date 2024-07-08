import { Locator } from '@playwright/test';
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '@data/urls.data';

export class MainPage extends BasePage {
  H1_TITLE: Locator;

  constructor(page: Page) {
    super(page);
    this.H1_TITLE = page.locator('h1');
  }

  async goto() {
    await this.page.goto(URLS.base);
  }

  async checkH1Title(title: string) {
    await expect(this.H1_TITLE, 'H1 text must be another').toContainText(title);
  }
}
