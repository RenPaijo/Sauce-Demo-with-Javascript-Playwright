import { expect } from '@playwright/test'

export class PageDashboard{

    constructor(page){
        this.page = page;

        this.cartBtn = page.getByText('Add to cart');
        this.filter = page.locator('.product_sort_container');
        this.cartIcn = page.locator('.shopping_cart_link');
        this.cartCount = page.locator('.shopping_cart_badge');
        this.itemsName = page.locator('.inventory_item_name');
        this.cartItem = page.locator('.cart_item');
    }

    async addItemsAndVerifyCart(productIndexes) {
        let expectedCount = 1;

        for (const index of productIndexes) {
            await this.cartBtn.nth(index).click();

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