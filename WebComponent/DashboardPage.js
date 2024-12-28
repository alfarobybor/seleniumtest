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
        try {
            const buttons = await this.driver.findElements(this.addToCartButtons);
            if (buttons[itemIndex]) {
                await buttons[itemIndex].click();
            } else {
                throw new Error('Item index out of range');
            }
        } catch (err) {
            console.error('Failed to add item to cart:', err);
        }
    }
}

module.exports = DashboardPage;
