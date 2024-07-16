import { Page } from '@playwright/test';
import { Assert } from '../Assert';

export abstract class BasePage extends Assert {
  constructor(protected page: Page) {
    super();
  }

  async goto() {
    console.log('This function must be overridden for page');
  }
}
