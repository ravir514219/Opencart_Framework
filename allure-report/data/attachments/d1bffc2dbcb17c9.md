# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logout.spec.ts >> logout test @master @regression
- Location: tests\logout.spec.ts:27:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: [Function isMyaccountExsist]
```

# Test source

```ts
  1  | import{test, expect} from "@playwright/test";
  2  | import { TestConfig } from "../test.config";
  3  | import { Homepage } from "../pages/Homepage";
  4  | import { Loginpage } from "../pages/Loginpage";
  5  | import { MyAccount } from "../pages/MyAccount";
  6  | import { Logoutpage } from "../pages/Logoutpage";
  7  | 
  8  | let config:TestConfig;
  9  | let homePage:Homepage;
  10 | let loginPage:Loginpage;
  11 | let myAcc:MyAccount;
  12 | let logoutPage:Logoutpage;
  13 | 
  14 | test.beforeEach(async({page})=>{
  15 |     config = new TestConfig();
  16 |     await page.goto(config.appUrl);
  17 |     homePage = new Homepage(page);
  18 |     loginPage = new Loginpage(page);
  19 |     myAcc = new MyAccount(page);
  20 |     logoutPage = new Logoutpage(page);
  21 | })
  22 | 
  23 | test.afterEach(async({page})=>{
  24 |     await page.close();
  25 | })
  26 | 
  27 | test('logout test @master @regression',async ()=>{
  28 |     await homePage.myAccountClk();
  29 |     await homePage.LoginClk();
  30 |     await loginPage.LoginAction(config.email, config.password);
> 31 |     expect (myAcc.isMyaccountExsist).toBe(true);
     |                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |     await myAcc.ClickLogout();
  33 |     expect(logoutPage.isLogoutTitleExsist).toBeTruthy();
  34 |     homePage = await logoutPage.clickContinueBtn();
  35 |     expect (await homePage.isHomePageExsist()).toBe(true);
  36 | 
  37 | 
  38 | })
```