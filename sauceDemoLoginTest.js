const { Builder, By, Key, until } = require('selenium-webdriver');

async function testSauceDemo() {
    
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // masuk ke web nya
        await driver.get('https://www.saucedemo.com');

        // login dengan username dan password valid
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);

        // validate user berada di dashboard setelah login
        await driver.wait(until.elementLocated(By.css('.inventory_list')), 10000);
        console.log("User successfully logged in and is on the dashboard.");

        // add item to cart
        await driver.findElement(By.css('.inventory_item button')).click();

        // Validate item sukses ditambahkan ke cart
        let cartBadge = await driver.findElement(By.css('.shopping_cart_badge')).getText();
        if (cartBadge === '1') {
            console.log("Item successfully added to the cart.");
        } else {
            console.error("Failed to add item to the cart.");
        }

    } catch (error) {
        console.error(`Test failed: ${error}`);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

testSauceDemo();
