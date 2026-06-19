import{test, expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import { Loginpage } from "../pages/Loginpage";
import { MyAccount } from "../pages/MyAccount";
import { Logoutpage } from "../pages/Logoutpage";

let config:TestConfig;
let homePage:Homepage;
let loginPage:Loginpage;
let myAcc:MyAccount;
let logoutPage:Logoutpage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new Homepage(page);
    loginPage = new Loginpage(page);
    myAcc = new MyAccount(page);
    logoutPage = new Logoutpage(page);
})

test.afterEach(async({page})=>{
    await page.close();
})

test('logout test @master @regression',async ()=>{
    await homePage.myAccountClk();
    await homePage.LoginClk();
    await loginPage.LoginAction(config.email, config.password);
    expect ((await myAcc.isMyaccountExsist())).toBe(true);
    await myAcc.ClickLogout();
    expect(logoutPage.isLogoutTitleExsist).toBeTruthy();
    homePage = await logoutPage.clickContinueBtn();
    expect (await homePage.isHomePageExsist()).toBe(true);


})