const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require ('../WebComponent/CartPage')
const assert = require('assert');
const fs = require('fs');

require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}


describe('TestCase 3', function () {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase){

        case 'safari':
            const safari = require('selenium-webdriver/safari');
            options = new safari.Options();
            options.addArguments('--headless');

        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');

        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');

    }
 

    before(async function () {
        driver = await new Builder().setChromeOptions(options).build();
    });


    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('User successfully logs in and verifies dashboard TC3', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be "Products"');
    });

    it('Add item to cart and validate success TC3', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addItemToCart();

        const cartPage = new CartPage(driver);
        await cartPage.navigateToCart();

        const itemsCount = await cartPage.getCartItemsCount();
        assert.strictEqual(itemsCount, 1, 'Expected 1 item in the cart');
    });

    afterEach(async function(){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
            fs.writeFileSync(filepath, screenshot, 'base64');
        });

    after(async function () {
        await driver.quit();
    });
});
