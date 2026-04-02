const { test, expect } = require ('@playwright/test');
import { PageDashboard } from '../pages/PageDashboard';
import { PageCheckout } from '../pages/PageCheckout';
import { PageOverview } from '../pages/PageOverview';
import{ fakerID_ID as faker } from '@faker-js/faker';

test.describe('Checkout overview test', () => {
    let pageCheckout, pageDashboard, pageOverview;

    test.beforeEach('Navigasi dan pengambilan item', async ({page}) => {
        pageCheckout = new PageCheckout(page);
        pageDashboard = new PageDashboard(page);
        pageOverview = new PageOverview(page);

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode('#####')

        await page.goto('/inventory.html');
        await pageDashboard.addMultipleItemsAndValidates([
            'Sauce Labs Onesie',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Backpack'
        ]);

        await page.goto('/checkout-step-one.html');
        await pageCheckout.inputForm(firstName, lastName, zipCode);
        await pageCheckout.clickContinueBtn();

        await page.goto('/checkout-step-two.html');
        await expect(pageOverview.pageOverview).toBeVisible();
    })

    test('Validate items total', async ({page}) => {
        await expect(pageOverview.item).toHaveCount(3);
    })

    test('Total price test', async ({page}) => {
        const x = await pageOverview.totalPrice.textContent();
        const total = parseFloat(x.replace(/[^0-9.]/g, ''));
        

        const totalPrice = await pageOverview.sumPriceTotal();
        expect(totalPrice).toEqual(total);
    })

})