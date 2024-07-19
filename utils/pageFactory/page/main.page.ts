import {
  LOCALIZATION,
  MAIN_PAGE_H1_TEXT,
  URLS,
} from '../../../helpers/testData';
import { HeaderComponent } from '../component';
import { BasePage } from '../abstractClasses';

export class MainPage extends BasePage {
  readonly header = new HeaderComponent(this.page);
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
