const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.xpath("//input[@id='first-name']");
        this.lastNameField = By.xpath("//input[@id='last-name']");
        this.postalCodeField = By.xpath("//input[@id='postal-code']");
        this.continueButton = By.xpath("//input[@id='continue']");
        this.overviewTitle = By.className('title');
        this.finishButton = By.id('finish');
        this.finishMessage = By.className('complete-header');
    }

    async fillCheckoutInfo( firstName, lastName, postalCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
        await this.driver.findElement(this.continueButton).click();
    }

    async getOverviewTitle() {
        const titleElement = await this.driver.findElement(this.overviewTitle);
        return titleElement.getText();
    }

    async completeCheckout() {
        await this.driver.findElement(this.finishButton).click();
    }

    async getFinishMessage() {
        const messageElement = await this.driver.findElement(this.finishMessage);
        return messageElement.getText();
    }
}

module.exports = CheckoutPage;
