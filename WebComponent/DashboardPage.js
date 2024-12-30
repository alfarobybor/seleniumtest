const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.addToCartButtons = By.className('btn_inventory');
    }

    async isOnDashboard() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addItemToCart(itemIndex = 0) {
        const buttons = await this.driver.findElements(this.addToCartButtons);
        if (buttons[itemIndex]) {
            console.log('Clicking on Add to Cart button');
            await buttons[itemIndex].click();
        } else {
            throw new Error('Item index out of range');
        }
    }
    
}

module.exports = DashboardPage;
