import { test as baseTest } from '@playwright/test';
import { HeaderPage, MainPage } from '../pageFactory';

const test = baseTest.extend<{
  headerPage: HeaderPage;
  mainPage: MainPage;
}>({
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
});

export default test;
