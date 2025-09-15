export class PageOverview {

    constructor(page){
        this.page = page;

        this.pageOverview = page.getByText('Checkout: Overview');
        this.item = page.locator('.cart_item');
        this.priceTotal = page.locator('.summary_subtotal_label');
        this.priceTax = page.locator('.summary_tax_label');
        this.totalPrice = page.locator('.summary_total_label');
        this.finishBtn = page.locator('button[name="finish"]');
        this.checkOutComplete = page.locator('#checkout_complete_container');
    }

    async sumPriceTotal(){
        const iValue = await this.priceTotal.textContent();
        const taValue = await this.priceTax.textContent();
        const priceNumber = parseFloat(iValue.replace(/[^0-9.]/g, ''));
        const taxNumber = parseFloat(taValue.replace(/[^0-9.]/g, ''));

        const resultPrice = priceNumber + taxNumber;
        return resultPrice;
    }

    async clickFinishBtn(){
        await this.finishBtn.click();
    }
}