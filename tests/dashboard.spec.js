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

    test('Test pengambilan satu item', async ({page}) => {
        await expect(pageDashboard.cartCount).toBeHidden();

        await pageDashboard.addItemsAndVerifyCart([1]);

        await pageDashboard.cartIcn.click();
        await expect(pageDashboard.cartItem).toHaveCount(1);
    })
    
    test('Test pengambilan beberapa items', async ({page}) => {
        await expect(pageDashboard.cartCount).toBeHidden();

        await pageDashboard.addItemsAndVerifyCart([0, 2, 3]);

        await pageDashboard.cartIcn.click();
        await expect(pageDashboard.cartItem).toHaveCount(3);
    })
})