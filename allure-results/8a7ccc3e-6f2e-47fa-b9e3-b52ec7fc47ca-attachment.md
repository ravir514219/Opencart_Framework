# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DataDriven.spec.ts >> login test with JSON Data: Valid Login @master
- Location: tests\DataDriven.spec.ts:13:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { TestConfig } from "../test.config";
  3  | import { Homepage } from "../pages/Homepage";
  4  | import { Loginpage } from "../pages/Loginpage";
  5  | import { MyAccount } from "../pages/MyAccount";
  6  | import { DataProvider, LoginTestData } from "../utils/DataProvider";
  7  | 
  8  | const jsonData = DataProvider.getTestDataFromJson<LoginTestData>(
  9  |   "testData/logindata.json",
  10 | );
  11 | 
  12 | for (let data of jsonData) {
  13 |   test(
  14 |     `login test with JSON Data: ${data.testName} @master`,
  15 |     { tag: ["@datadriven"] },
  16 |     async ({ page }) => {
  17 |       const testConfig = new TestConfig();
> 18 |       await page.goto(testConfig.appUrl);
     |                  ^ Error: page.goto: Test timeout of 30000ms exceeded.
  19 |       const homePage = new Homepage(page);
  20 |       await homePage.myAccountClk();
  21 |       await homePage.LoginClk();
  22 |       const loginPage = new Loginpage(page);
  23 |       await loginPage.LoginAction(data.email, data.password);
  24 | 
  25 |       if (data.expected.toLowerCase() === "success") {
  26 |         const myAccount = new MyAccount(page);
  27 |         const isLoggedIn = await myAccount.isMyaccountExsist();
  28 |         expect(isLoggedIn).toBe(true);
  29 |       } else {
  30 |         const msg = await loginPage.captureErrorMsg();
  31 |         expect(msg).toContain(
  32 |           "Warning: No match for E-Mail Address and/or Password.",
  33 |         );
  34 |       }
  35 |     },
  36 |   );
  37 | }
  38 | 
  39 | const csvData = DataProvider.getTestDataFromCsv<LoginTestData>(
  40 |   "testData/logindata.csv",
  41 | );
  42 | 
  43 | for (let data of csvData) {
  44 |   test(
  45 |     `login test with CSV Data: ${data.testName} @master`,
  46 |     { tag: ["@datadriven"] },
  47 |     async ({ page }) => {
  48 |       const testConfig = new TestConfig();
  49 |       await page.goto(testConfig.appUrl);
  50 |       const homePage = new Homepage(page);
  51 |       await homePage.myAccountClk();
  52 |       await homePage.LoginClk();
  53 |       const loginPage = new Loginpage(page);
  54 |       await loginPage.LoginAction(data.email, data.password);
  55 | 
  56 |       if (data.expected.toLowerCase() === "success") {
  57 |         const myAccount = new MyAccount(page);
  58 |         const isLoggedIn = await myAccount.isMyaccountExsist();
  59 |         expect(isLoggedIn).toBe(true);
  60 |       } else {
  61 |         const msg = await loginPage.captureErrorMsg();
  62 |         expect(msg).toContain(
  63 |           "Warning: No match for E-Mail Address and/or Password.",
  64 |         );
  65 |       }
  66 |     },
  67 |   );
  68 | }
  69 | 
```