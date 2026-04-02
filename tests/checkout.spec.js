const { test, expect } = require('@playwright/test');
import{ fakerID_ID as faker } from '@faker-js/faker';
import { PageCheckout } from '../pages/PageCheckout.js';
import { PageDashboard } from '../pages/PageDashboard.js';

test.describe('Checkout: Your Information testing', () => {
    let pageCheckout, pageDashboard;

    test.beforeEach('Pengambilan item dan navigasi ke link testing', async ({page}) => {
        pageCheckout = new PageCheckout(page);
        pageDashboard = new PageDashboard(page);

        await page.goto('/inventory.html');
        await pageDashboard.addItemByName('Sauce Labs Backpack')

        await page.goto('/checkout-step-one.html');
        await expect(pageCheckout.information).toBeVisible();
    })

    test('Valid input form', async ({page}) => {
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomZip = faker.location.zipCode('#####');

        await pageCheckout.inputForm(
            randomFirstName,
            randomLastName,
            randomZip
        );

        await expect(pageCheckout.firstName).toHaveValue(randomFirstName);
        await expect(pageCheckout.lastName).toHaveValue(randomLastName);
        await expect(pageCheckout.zip).toHaveValue(randomZip);

        await pageCheckout.clickContinueBtn();
    })

    test.describe('Blank input form', () => {
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomZip = faker.location.zipCode('#####');

        test('Blank input first name', async ({page}) => {
            await pageCheckout.inputForm('', randomLastName, randomZip);

            await pageCheckout.clickContinueBtn();
            await expect(pageCheckout.blank1).toBeVisible();
        })

        test('Blank input last name', async ({page}) => {
            await pageCheckout.inputForm(randomFirstName, '', randomZip);

            await pageCheckout.clickContinueBtn();
            await expect(pageCheckout.blank2).toBeVisible();
        })

        test('Blank input zip code', async ({page}) => {
            await pageCheckout.inputForm(randomFirstName, randomLastName, '');

            await pageCheckout.clickContinueBtn();  
            await expect(pageCheckout.blank3).toBeVisible();
        })
    })
})