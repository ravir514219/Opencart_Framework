import{test, expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import{ searchResultPage } from "../pages/searchResultPage";

let config:TestConfig;
let homePage:Homepage;
let serachRespage:searchResultPage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new Homepage(page);
    serachRespage = new searchResultPage(page);

})
test.afterEach(async({page})=>{
    await page.close();
})

test('Search product @master @regression',async()=>{
    const prodName = config.productName;
    await homePage.searchBoxEnter(prodName);
    await homePage.searchBtnClk();
    expect(await serachRespage.productHeaderExsist()).toBeTruthy();

    let isProductFound  = await serachRespage.isProductExsist(prodName);
    expect(isProductFound).toBe(true);

})