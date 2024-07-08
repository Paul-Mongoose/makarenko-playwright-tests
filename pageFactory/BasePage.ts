import { Locator } from 'playwright-core';
import { expect, Page } from '@playwright/test';
import { USER } from '../data';

export class BasePage {
  page: Page;

  private HEADER_ELEMENT: Locator;
  PROJECTS_BUTTON: Locator;
  LANGUAGE_BUTTON: Locator;
  LOGIN_BUTTON: Locator;

  private HEADER_LOGIN_MODAL: Locator;
  LOGIN_MODAL_BUTTON: Locator;
  INPUT_LOGIN_EMAIL: Locator;
  INPUT_LOGIN_PASSWORD: Locator;
  USER_NAME_DISPLAY: Locator;

  private LOGIN_MODAL_ERROR_OUTPUT: Locator;
  LOGIN_MODAL_ERROR_MESSAGE: Locator;
  LOGIN_MODAL_ERROR_DESCRIPTION: Locator;

  HEADER_MENU_DROPDOWN: Locator;
  MENU_PROJECTS_BUTTON: Locator;
  MENU_PROFILE_BUTTON: Locator;
  MENU_BALANCE_BUTTON: Locator;
  MENU_ORDERS_BUTTON: Locator;
  MENU_STATISTIC_BUTTON: Locator;
  MENU_TARIFFS_BUTTON: Locator;
  MENU_SETTINGS_BUTTON: Locator;
  MENU_LOGOUT_BUTTON: Locator;

  constructor(page: Page) {
    this.page = page;
    this.HEADER_ELEMENT = page.locator('site-header .container');
    this.PROJECTS_BUTTON = this.HEADER_ELEMENT.locator(
      'li.ant-menu-item a[href="/projects"]',
    );
    this.LANGUAGE_BUTTON = this.HEADER_ELEMENT.locator('.localization');
    this.LOGIN_BUTTON = this.HEADER_ELEMENT.locator(
      '.login-container',
    ).getByRole('button', { name: /Login/i });
    this.USER_NAME_DISPLAY = this.HEADER_ELEMENT.locator('.username');

    this.HEADER_LOGIN_MODAL = this.page.getByRole('document');
    this.LOGIN_MODAL_BUTTON = this.HEADER_LOGIN_MODAL.locator(
      '#cdk-overlay-1',
    ).getByRole('button', { name: /Login/i });
    this.INPUT_LOGIN_EMAIL = this.HEADER_LOGIN_MODAL.locator(
      'input[name="email"]',
    );
    this.INPUT_LOGIN_PASSWORD = this.HEADER_LOGIN_MODAL.locator(
      'input[name="password"]',
    );

    this.LOGIN_MODAL_ERROR_OUTPUT =
      this.HEADER_LOGIN_MODAL.locator('.ant-alert');
    this.LOGIN_MODAL_ERROR_MESSAGE =
      this.LOGIN_MODAL_ERROR_OUTPUT.locator('.ant-alert-message');
    this.LOGIN_MODAL_ERROR_DESCRIPTION = this.LOGIN_MODAL_ERROR_OUTPUT.locator(
      '.ant-alert-description',
    );

    this.HEADER_MENU_DROPDOWN = this.page
      .locator('.ant-dropdown')
      .getByRole('listitem');
    this.MENU_PROJECTS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-project',
    );
    this.MENU_PROFILE_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-user',
    );
    this.MENU_BALANCE_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-translation',
    );
    this.MENU_ORDERS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-shopping-cart',
    );
    this.MENU_STATISTIC_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-bar-chart',
    );
    this.MENU_TARIFFS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-bulb',
    );
    this.MENU_SETTINGS_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-setting',
    );
    this.MENU_LOGOUT_BUTTON = this.HEADER_MENU_DROPDOWN.locator(
      '.anticon.anticon-logout',
    );
  }

  async verifyModalLoginButton(disabled: boolean) {
    expect(await this.LOGIN_MODAL_BUTTON.isDisabled()).toBe(disabled);
  }

  async loginToApplication(user = USER) {
    await this.LOGIN_BUTTON.click();
    await this.INPUT_LOGIN_EMAIL.fill(user.email);
    await this.INPUT_LOGIN_PASSWORD.fill(user.password);
    await this.LOGIN_MODAL_BUTTON.click();
  }

  async languageButtonClick() {
    await this.LANGUAGE_BUTTON.click();
    await this.HEADER_MENU_DROPDOWN.isVisible();
  }
}
