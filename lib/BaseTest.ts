import { test as baseTest } from '@playwright/test';
import { MainPage } from '../utils/pageFactory/page';

const test = baseTest.extend<{
  mainPage: MainPage;
}>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
});

export default test;
