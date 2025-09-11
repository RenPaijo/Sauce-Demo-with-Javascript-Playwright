const { test, expect } = require('@playwright/test');
import { PageLogin } from '../pages/PageLogin';

test.describe('Test login logout pada Sauce Demo', () => {
    let pageLogin;

    test.beforeEach('Navigasi ke link Sauce Demo', async ({page}) => {
        pageLogin = new PageLogin(page);

        await page.goto('https://www.saucedemo.com/')
    })

    test('Valid login', async ({page}) => {
        await pageLogin.Login('standard_user', 'secret_sauce');
        await expect.soft(pageLogin.dashboard).toBeVisible();
    })

    test('Invalid login wrong input', async ({page}) => {
        await pageLogin.Login('standard_users', 'secret_saucea');
        await expect.soft(pageLogin.error2).toBeVisible();
    })

    test('Invalid login blank input', async ({page}) => {
        await pageLogin.Login('', '');
        await expect.soft(pageLogin.error1).toBeVisible();
    })

    test('Log out', async ({page}) => {
        await pageLogin.Login('standard_user', 'secret_sauce');
        await pageLogin.logout();
        await expect(pageLogin.loginBtn).toBeVisible();
    })
})