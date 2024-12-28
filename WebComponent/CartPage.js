const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItems = By.className('cart_item');
        this.checkoutButton = By.id('checkout');
        this.continueShoppingButton = By.id('continue-shopping');
        this.addToCartButtons = By.className('btn_inventory');
    }

    async navigateToCart() {
        await this.driver.findElement(By.className('shopping_cart_link')).click();
    }

    async getCartItemsCount() {
        try {
            const items = await this.driver.findElements(this.cartItems);
            return items.length;
        } catch (err) {
            return 0; // Tidak ada item di keranjang
        }
    }

    async clickCheckout() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async clickContinueShopping() {
        await this.driver.findElement(this.continueShoppingButton).click();
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

module.exports = CartPage;
