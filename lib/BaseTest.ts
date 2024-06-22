import { test as baseTest } from '@playwright/test';
import { HeaderPage } from '../pageFactory/headerPage';

const test = baseTest.extend<{
  headerPage: HeaderPage;
}>({
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
});

export default test;
