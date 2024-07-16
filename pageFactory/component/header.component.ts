import { expect } from '@playwright/test';
import { HEADER_BUTTONS, LANGUAGES, LOCALIZATION, USER } from '../../data';
import { Component } from '../abstractClasses';

export class HeaderComponent extends Component {
  private HEADER_ELEMENT = this.page.locator('site-header .container');
  PROJECTS_BUTTON = this.HEADER_ELEMENT.locator(
    'li.ant-menu-item a[routerlink="/projects"]',
  );
  LANGUAGE_BUTTON = this.HEADER_ELEMENT.locator('.localization');
  LOGIN_BUTTON = this.HEADER_ELEMENT.locator('.login-container').getByRole(
    'button',
    { name: /Login/i },
  );
  USER_NAME_DISPLAY = this.HEADER_ELEMENT.locator('.username');
  TARIFF_PLAN_DISPLAY = this.HEADER_ELEMENT.locator('.plan');

  HEADER_LOGIN_MODAL = this.page.locator('.ant-modal-content');
  LOGIN_MODAL_BUTTON = this.HEADER_LOGIN_MODAL.locator('.actions').getByRole(
    'button',
    { name: /Login/i },
  );
  INPUT_LOGIN_EMAIL = this.HEADER_LOGIN_MODAL.locator('input[name="email"]');
  INPUT_LOGIN_PASSWORD = this.HEADER_LOGIN_MODAL.locator(
    'input[name="password"]',
  );

  private LOGIN_MODAL_ERROR_OUTPUT =
    this.HEADER_LOGIN_MODAL.locator('.ant-alert');
  LOGIN_MODAL_ERROR_MESSAGE =
    this.LOGIN_MODAL_ERROR_OUTPUT.locator('.ant-alert-message');
  LOGIN_MODAL_ERROR_DESCRIPTION = this.LOGIN_MODAL_ERROR_OUTPUT.locator(
    '.ant-alert-description',
  );

  HEADER_MENU_DROPDOWN = this.page
    .locator('.ant-dropdown')
    .getByRole('listitem');
  MENU_PROJECTS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-project',
  );
  MENU_PROFILE_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-user',
  );
  MENU_BALANCE_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-translation',
  );
  MENU_ORDERS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-shopping-cart',
  );
  MENU_STATISTIC_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-bar-chart',
  );
  MENU_TARIFFS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-bulb',
  );
  MENU_SETTINGS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-setting',
  );
  MENU_LOGOUT_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
    '.anticon.anticon-logout',
  );

  async verifyModalLoginButton(disabled: boolean) {
    expect(await this.LOGIN_MODAL_BUTTON.isDisabled()).toBe(disabled);
  }

  async loginToApplication(user = USER) {
    await this.LOGIN_BUTTON.click();
    await this.INPUT_LOGIN_EMAIL.fill(user.email);
    await this.INPUT_LOGIN_PASSWORD.fill(user.password);
    await this.LOGIN_MODAL_BUTTON.click();
  }

  async loginAndCheck(user = USER) {
    await this.loginToApplication(user);
    await expect(this.USER_NAME_DISPLAY).toHaveText(USER.name);
  }

  async languageButtonClick() {
    await this.LANGUAGE_BUTTON.click();
    await this.HEADER_MENU_DROPDOWN.isVisible();
  }

  async changeLanguage(language: LOCALIZATION) {
    await this.languageButtonClick();
    await this.HEADER_MENU_DROPDOWN.filter({
      hasText: LANGUAGES[language],
    }).click();
  }

  async checkLocalization(
    localization: LOCALIZATION,
    locator = this.PROJECTS_BUTTON,
  ): Promise<void> {
    await this.checkTextContain(
      locator,
      HEADER_BUTTONS.PROJECTS[localization],
      'Header button PROJECTS must have another title',
    );
  }

  async changeLanguageAndCheck(language: LOCALIZATION) {
    await this.changeLanguage(language);
    await this.checkLocalization(language);
  }
}
