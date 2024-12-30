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

    async addItemToCart() {
        const addToCartButton = await this.driver.findElement(By.css('.add-to-cart-button'));
        await addToCartButton.click();
    }
    

    async getCartItemsCount() {
        try {
            const items = await this.driver.findElements(this.cartItems);
            return items.length;
        } catch (err) {
            console.log('Error getting cart items:', err);
            return 0; // No items in the cart
        }
    }

    async proceedToCheckout() {
        const itemsCount = await this.getCartItemsCount();
        await this.driver.findElement(this.checkoutButton).click();
    }

    async clickCheckout() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    
}

module.exports = CartPage;
