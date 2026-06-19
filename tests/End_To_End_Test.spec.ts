import{test, expect, type Page} from "@playwright/test";
import { Homepage } from "../pages/Homepage";
import { Loginpage } from "../pages/Loginpage";
import { Logoutpage } from "../pages/Logoutpage";
import { MyAccount } from "../pages/MyAccount";
//import { Productpage } from "../pages/Productpage";
import { Registation } from "../pages/Registration";
import { searchResultPage } from "../pages/searchResultPage";
import { ShoppingCartpage } from "../pages/ShoppingCartpage";
import { TestConfig} from "../test.config";
import { TestDataUtils } from "../utils/TestDataGenerator";

let config:TestConfig;
let email:string;
let homepage:Homepage;
let myAcc:MyAccount;
let logout:Logoutpage;
let login:Loginpage;
//let productPage:Productpage;
let searchRes:searchResultPage;
let shopCart:ShoppingCartpage;

test('End to End Validation @end-to-end @master',async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    let NewEmail = await PerformRegistration(page);
    await PerformLogout(page);
    await PerformLogin(page, NewEmail);
    await PerformAddToCart(page);
    await VerifyShopCart(page);
})





async function PerformRegistration (page:Page):Promise<string>{
     config = new TestConfig();
     homepage = new Homepage(page);
    await homepage.myAccountClk();
    await homepage.RegisterClk();
    const reg = new Registation(page);
    await reg.fillFName(TestDataUtils.getFirstName());
    await reg.fillLstName(TestDataUtils.getLastName());
    email = TestDataUtils.getEmail();
    await reg.fillEmail(email);
    await reg.fillPhoneNum(TestDataUtils.getPhoneNumber());
    let password = config.password;
    await reg.fillPass(password);
    await reg.fillCnfPass(password);
    await reg.checkPolicy();
    await reg.submitClk();
    expect(await reg.VerifyCnfMsg()).toContain("Your Account Has Been Created!");
    await reg.ClickContinueBtn();
    return email;
}

async function PerformLogout(page:Page){
    logout = new Logoutpage(page);
    myAcc = new MyAccount(page);
    await myAcc.ClickLogout();
    expect(await logout.isLogoutTitleExsist()).toBe(true);
    homepage = await logout.clickContinueBtn();
    expect(await homepage.isHomePageExsist()).toBe(true);
}

async function PerformLogin(page:Page, email:string){
    
    const config = new TestConfig();
    await page.goto(config.appUrl);
    myAcc = new MyAccount(page);
    login = new Loginpage(page);
    await homepage.myAccountClk();
    await homepage.LoginClk();
    await login.LoginAction(email, config.password);
    expect (await myAcc.isMyaccountExsist()).toBe(true);

}

async function PerformAddToCart(page:Page){
    searchRes = new searchResultPage(page);
    const productName = config.productName;
    await homepage.searchBoxEnter(productName);
    await homepage.searchBtnClk();
    expect (await searchRes.productHeaderExsist()).toBeTruthy();
    expect(await searchRes.isProductExsist(productName)).toBeTruthy();
    let productPage  = await searchRes.selectProduct(productName);
   await productPage?.setQunantity(config.productQuantity);
   await productPage?.ClickAddToCart();
   await productPage?.ClickAddcart();
   const shopCart = await productPage?.ClickViewCart();
   expect(await shopCart?.verifyShoppingCartpageExsist()).toBe(true);
}

async function VerifyShopCart(page:Page){
    shopCart = new ShoppingCartpage(page);
   const totlPrice =  await shopCart.getTotalPrice();
   expect (totlPrice).toContain('$1,204.00');
   expect(await shopCart.isCheckoutBtnVisible()).toBe(true);

}