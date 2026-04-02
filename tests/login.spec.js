const { test, expect } = require('@playwright/test');
import { PageLogin } from '../pages/PageLogin';

test.describe('Test login logout pada Sauce Demo', () => {
    let pageLogin;

    test.beforeEach('Navigasi ke link Sauce Demo', async ({page}) => {
        pageLogin = new PageLogin(page);

        await page.goto('/')
    })

    test('Valid login', async ({page}) => {
        await pageLogin.Login(process.env.USER, process.env.PASSWORD);
        await expect.soft(pageLogin.dashboard).toBeVisible();
    })

    test('Invalid login wrong input', async ({page}) => {
        await pageLogin.Login('standard_users', 'secret_saucea');
        await expect.soft(pageLogin.error).toBeVisible();
    })

    test.describe('Blank input login test', () => {

        test('Username blank', async ({page}) => {
            await pageLogin.Login('', 'secret_sauce');
            await expect.soft(pageLogin.blank1).toBeVisible();
        })

        test('Password blank', async ({page}) => {
            await pageLogin.Login('standard_user', '');
            await expect.soft(pageLogin.blank2).toBeVisible();
        })
    })

    test('Log out', async ({page}) => {
        await pageLogin.Login(process.env.USER, process.env.PASSWORD);
        await pageLogin.logout();
        await expect(pageLogin.loginBtn).toBeVisible();
    })
})