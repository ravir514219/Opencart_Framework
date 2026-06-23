# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddToCart.spec.ts >> Add to cart @master @regression
- Location: tests\AddToCart.spec.ts:27:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import{test, expect} from "@playwright/test";
  2  | import { TestConfig } from "../test.config";
  3  | import { Homepage } from "../pages/Homepage";
  4  | import{ searchResultPage } from "../pages/searchResultPage";
  5  | import { Productpage } from "../pages/Productpage";
  6  | import { ShoppingCartpage } from "../pages/ShoppingCartpage";
  7  | 
  8  | let config:TestConfig;
  9  | let homePage:Homepage;
  10 | let serachRespage:searchResultPage;
  11 | let productpage:Productpage;
  12 | let shoppingcart:ShoppingCartpage;
  13 | 
  14 | test.beforeEach(async({page})=>{
  15 |     config = new TestConfig();
> 16 |     await page.goto(config.appUrl);
     |                ^ Error: page.goto: Target page, context or browser has been closed
  17 |     homePage = new Homepage(page);
  18 |     shoppingcart = new ShoppingCartpage(page);
  19 |     serachRespage = new searchResultPage(page);
  20 |     productpage = new Productpage(page);
  21 | })
  22 | 
  23 | test.afterEach(async({page})=>{
  24 |     await page.close();
  25 | })
  26 | 
  27 | test('Add to cart @master @regression', async()=>{
  28 |     const prodName = config.productName;
  29 |     await homePage.searchBoxEnter(prodName);
  30 |     await homePage.searchBtnClk();
  31 |     expect (await serachRespage.productHeaderExsist()).toBe(true);
  32 |     await serachRespage.selectProduct(prodName);
  33 |     await productpage.AddProduct(config.productQuantity);
  34 |     await productpage.ClickAddcart();
  35 |     await productpage.ClickViewCart();
  36 |     expect(await shoppingcart.verifyShoppingCartpageExsist()).toBeTruthy();
  37 | })
```