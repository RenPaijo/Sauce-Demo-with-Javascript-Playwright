import { test as setup, expect } from '@playwright/test'
import { PageLogin } from '../pages/PageLogin'

const authFile = 'user.json';

setup('authenticate', async ({page}) => {
    const pageLogin = new PageLogin(page);

    await page.goto('/')
    await pageLogin.Login(process.env.USER, process.env.PASSWORD);
    await expect(pageLogin.dashboard).toBeVisible();

    await page.context().storageState({path: authFile});
})