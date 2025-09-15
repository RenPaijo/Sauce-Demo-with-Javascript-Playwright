const { test, expect } = require ('@playwright/test')
import { PageDashboard } from '../pages/PageDashboard'

test.describe('Test untuk berbagai case di dashboard', () => {
    let pageDashboard;

    test.beforeEach('Navigasi ke dashboard', async ({page}) => {
        pageDashboard = new PageDashboard(page);

        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(pageDashboard.cartIcn).toBeVisible();
    })

    test('Filter tampilan', async ({page}) => {
        await expect(pageDashboard.itemsName.first()).toHaveText('Sauce Labs Backpack');
        await pageDashboard.filterSelect('hilo');
        await expect(pageDashboard.itemsName.first()).toHaveText('Sauce Labs Fleece Jacket');
    })

    test.describe('Test pengambilan item', () => {
        test('Pengambilan satu item dengan nama', async ({page}) => {
            await pageDashboard.addItemByName('Test.allTheThings() T-Shirt (Red)');
        })

        test('Pengambilan beberapa item dengan nama', async ({page}) => {
            const itemNames = [
                'Sauce Labs Onesie',
                'Sauce Labs Bolt T-Shirt',
                'Sauce Labs Backpack'
            ]
            await pageDashboard.addMultipleItemsAndValidates(itemNames);

            await pageDashboard.cartIcn.click();
            await expect(pageDashboard.cartItem).toHaveCount(3);
        })
    })
})