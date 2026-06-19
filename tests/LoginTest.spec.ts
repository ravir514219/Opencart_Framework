import{test,expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import { Loginpage } from "../pages/Loginpage";
import { MyAccount } from "../pages/MyAccount";
let testConfig:TestConfig;
let homePage:Homepage;
let loginPage:Loginpage;
let myAccount:MyAccount;
test.beforeEach(async({page})=>{
    testConfig = new TestConfig();
    await page.goto(testConfig.appUrl);
    homePage = new Homepage(page);
    loginPage= new Loginpage(page);
    myAccount = new MyAccount(page);

})

test.afterEach(async({page})=>{
    await page.close();
})

test('Login test @master @regression',async()=>{
await homePage.myAccountClk();
await homePage.LoginClk();
await loginPage.LoginAction(testConfig.email,testConfig.password);
const isLoggedIn = await myAccount.isMyaccountExsist();
expect(isLoggedIn).toBeTruthy();
})

