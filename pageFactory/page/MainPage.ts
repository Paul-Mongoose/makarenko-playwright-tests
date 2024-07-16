import { URLS } from '../../data/urls.data';
import { LOCALIZATION } from '../../data/enums.data';
import { MAIN_PAGE_H1_TEXT } from '../../data/localization.data';
import { BasePage } from './BasePage';
import { Header } from '../component';

export class MainPage extends BasePage {
  header = new Header(this.page);
  H1_TITLE = this.page.locator('h1');

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