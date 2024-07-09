import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { URLS } from '@data/urls.data';
import { LOCALIZATION } from '@data/enums.data';
import { MAIN_PAGE_H1_TEXT } from '@data/localization.data';

export class MainPage extends HeaderPage {
  H1_TITLE: Locator;

  constructor(page: Page) {
    super(page);
    this.H1_TITLE = page.locator('h1');
  }

  async goto() {
    await this.page.goto(URLS.base);
  }
  async checkLocalization(
    localization: LOCALIZATION,
    locator = this.H1_TITLE,
  ): Promise<void> {
    await this.checkTextContain(
      locator,
      MAIN_PAGE_H1_TEXT[localization],
      'Header button PROJECTS mus have another title',
    );
  }
}
