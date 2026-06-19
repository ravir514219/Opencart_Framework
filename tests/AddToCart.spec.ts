import{test, expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import{ searchResultPage } from "../pages/searchResultPage";
import { Productpage } from "../pages/Productpage";
import { ShoppingCartpage } from "../pages/ShoppingCartpage";

let config:TestConfig;
let homePage:Homepage;
let serachRespage:searchResultPage;
let productpage:Productpage;
let shoppingcart:ShoppingCartpage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new Homepage(page);
    shoppingcart = new ShoppingCartpage(page);
    serachRespage = new searchResultPage(page);
    productpage = new Productpage(page);
})

test.afterEach(async({page})=>{
    await page.close();
})

test('Add to cart @master @regression', async()=>{
    const prodName = config.productName;
    await homePage.searchBoxEnter(prodName);
    await homePage.searchBtnClk();
    expect (await serachRespage.productHeaderExsist()).toBe(true);
    await serachRespage.selectProduct(prodName);
    await productpage.AddProduct(config.productQuantity);
    await productpage.ClickAddcart();
    await productpage.ClickViewCart();
    expect(await shoppingcart.verifyShoppingCartpageExsist()).toBeTruthy();
})