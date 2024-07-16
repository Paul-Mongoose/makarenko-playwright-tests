import { Page } from '@playwright/test';
import { Assert } from '../Assert';

export abstract class Component extends Assert {
  constructor(protected page: Page) {
    super();
  }
}
