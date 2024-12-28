const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const assert = require('assert');

describe('TestCase 1', function () {
    this.timeout(40000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('User successfully logs in and verifies dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be "Products"');
    });

    it('Add item to cart and validate success', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addItemToCart();

        const cartPage = new CartPage(driver);
        await cartPage.navigateToCart();

        const itemsCount = await cartPage.getCartItemsCount();
        assert.strictEqual(itemsCount, 1, 'Expected 1 item in the cart');
    });

    after(async function () {
        await driver.quit();
    });
});
