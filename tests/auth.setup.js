import { test as setup, expect } from '@playwright/test'
import { PageLogin } from '../pages/PageLogin'

const authFile = 'user.json';

setup('authenticate', async ({page}) => {
    const pageLogin = new PageLogin(page);

    await page.goto('https://www.saucedemo.com/')
    await pageLogin.Login('standard_user', 'secret_sauce');
    await expect(pageLogin.dashboard).toBeVisible();

    await page.context().storageState({path: authFile});
})