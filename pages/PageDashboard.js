import { expect } from '@playwright/test'

export class PageDashboard{

    constructor(page){
        this.page = page;

        this.inventoryItems = page.locator('.inventory_item');
        this.filter = page.locator('.product_sort_container');
        this.cartIcn = page.locator('.shopping_cart_link');
        this.cartCount = page.locator('.shopping_cart_badge');
        this.itemsName = page.locator('.inventory_item_name');
        this.cartItem = page.locator('.cart_item');
    }

    async addItemByName(name){
        const productItem = await this.inventoryItems.filter({ hasText: name });

        await productItem.getByRole('button', { name: 'Add to cart' }).click();
    }

    async addMultipleItemsAndValidates(itemNames){
        let expectedCount = 1;

        for (const name of itemNames) {
            await this.addItemByName(name);

            await expect(this.cartCount).toBeVisible();
            await expect(this.cartCount).toHaveText(String(expectedCount));

            expectedCount++;
        }
    }

    async filterSelect(value){
        await this.filter.selectOption(value);
    }

    async goToCartPage(){
        await this.cartIcn.click();
    }
}