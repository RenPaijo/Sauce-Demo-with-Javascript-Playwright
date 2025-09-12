export class PageLogin{

    constructor(page){
        this.page = page;

        this.usnInput = page.locator('input[name="user-name"]');
        this.passInput = page.locator('input[name="password"]');
        this.loginBtn = page.locator('input[type="submit"]');
        this.blank1 = page.getByText('Epic sadface: Username is required');
        this.error = page.getByText('Epic sadface: Username and password do not match any user in this service');
        this.blank2 = page.getByText('Epic sadface: Password is required');
        this.dashboard = page.locator('.inventory_container');
        this.hmbger = page.locator('button[type="button"]').first();
        this.logoutBtn = page.getByText('Logout');
    }

    async Login(usn, pass){
        await this.usnInput.fill(usn);
        await this.passInput.fill(pass);
        await this.loginBtn.click();
    }

    async logout(){
        await this.hmbger.click();
        await this.logoutBtn.click();
    }
}