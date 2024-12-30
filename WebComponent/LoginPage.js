const {By, Browser} = require ('selenium-webdriver');
const { get } = require('selenium-webdriver/http');

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.css('input[placeholder="Password"');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.css('.error-message-container');
    }

    async navigate(browser){
        await this.driver.get(browser);
    }

    async login(username, password){
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage(){
        try{
            const errorElement = await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (err){
            return null; //tidak ada message
        }
    }
}

module.exports = LoginPage;