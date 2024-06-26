import { Locator } from 'playwright-core';
import { expect, Page } from '@playwright/test';
import { USER } from '../data';

export class HeaderPage {
  public headerElement: Locator;
  public LOGIN_BUTTON: Locator;
  public LANGUAGE_BUTTON: Locator;

  public loginModal: Locator;
  public LOGIN_MODAL_BUTTON: Locator;
  public INPUT_LOGIN_EMAIL: Locator;
  public INPUT_LOGIN_PASSWORD: Locator;
  public USER_NAME_DISPLAY: Locator;

  public loginModalErrorField: Locator;
  public LOGIN_MODAL_ERROR_MESSAGE: Locator;
  public LOGIN_MODAL_ERROR_DESCRIPTION: Locator;

  public MENU_DROPDOWN: Locator;
  public MENU_PROJECTS_BUTTON: Locator;
  public MENU_PROFILE_BUTTON: Locator;
  public MENU_BALANCE_BUTTON: Locator;
  public MENU_ORDERS_BUTTON: Locator;
  public MENU_STATISTIC_BUTTON: Locator;
  public MENU_TARIFFS_BUTTON: Locator;
  public MENU_SETTINGS_BUTTON: Locator;
  public MENU_LOGOUT_BUTTON: Locator;

  constructor(page: Page) {
    this.headerElement = page.locator('site-header .container');
    this.LANGUAGE_BUTTON = this.headerElement.locator('.localization');
    this.LOGIN_BUTTON = this.headerElement
      .locator('.login-container')
      .getByRole('button', { name: /Login/i });
    this.USER_NAME_DISPLAY = this.headerElement.locator('.username');

    this.loginModal = page.getByRole('document');
    this.LOGIN_MODAL_BUTTON = this.loginModal
      .locator('#cdk-overlay-1')
      .getByRole('button', { name: /Login/i });
    this.INPUT_LOGIN_EMAIL = this.loginModal.locator('input[name="email"]');
    this.INPUT_LOGIN_PASSWORD = this.loginModal.locator(
      'input[name="password"]',
    );

    this.loginModalErrorField = this.loginModal.locator('.ant-alert');
    this.LOGIN_MODAL_ERROR_MESSAGE =
      this.loginModalErrorField.locator('.ant-alert-message');
    this.LOGIN_MODAL_ERROR_DESCRIPTION = this.loginModalErrorField.locator(
      '.ant-alert-description',
    );

    this.MENU_DROPDOWN = page.locator('.ant-dropdown');
    this.MENU_PROJECTS_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-project',
    );
    this.MENU_PROFILE_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-user',
    );
    this.MENU_BALANCE_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-translation',
    );
    this.MENU_ORDERS_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-shopping-cart',
    );
    this.MENU_STATISTIC_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-bar-chart',
    );
    this.MENU_TARIFFS_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-bulb',
    );
    this.MENU_SETTINGS_BUTTON = this.MENU_DROPDOWN.locator(
      '.anticon.anticon-setting',
    );
    this.MENU_LOGOUT_BUTTON = this.MENU_DROPDOWN.locator(
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
    await this.MENU_DROPDOWN.getByRole('listitem').isVisible();
  }
}
