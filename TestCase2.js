const {Builder} = require('selenium-webdriver')
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const assert = require('assert');

describe('TestCase 1', function(){
    this.timeout(40000);
    let driver;

    before (async function(){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach (async function(){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('haha', 'hihi');
    });

    it('error message appears for invalid credentials',async function(){
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match')
    });

    after (async function(){
        await driver.quit();
    });
});