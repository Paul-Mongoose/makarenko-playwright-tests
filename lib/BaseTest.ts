import {  test as baseTest } from '@playwright/test';
import {Header} from "../pageFactory/header";

const test = baseTest.extend<{
    header: Header;
}>({

    header: async ({ page }, use) => {
        await use(new Header(page));
    },
})

export default test;