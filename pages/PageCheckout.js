export class PageCheckout {

    constructor(page){

        this.page = page;

        this.information = page.getByText('Checkout: Your Information');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zip = page.locator('#postal-code');
        this.continueBtn = page.locator('input[type="submit"]');
        this.blank1 = page.getByText('Error: First Name is required');
        this.blank2 = page.getByText('Error: Last Name is required');
        this.blank3 = page.getByText('Error: Postal Code is required');
    }

    async inputForm(first, last, zip){
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.zip.fill(zip);
    }

    async clickContinueBtn(){
        await this.continueBtn.click();
    }
}