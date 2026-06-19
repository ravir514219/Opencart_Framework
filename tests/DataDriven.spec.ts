import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import { Loginpage } from "../pages/Loginpage";
import { MyAccount } from "../pages/MyAccount";
import { DataProvider, LoginTestData } from "../utils/DataProvider";

const jsonData = DataProvider.getTestDataFromJson<LoginTestData>(
  "testData/logindata.json",
);

for (let data of jsonData) {
  test(
    `login test with JSON Data: ${data.testName} @master`,
    { tag: ["@datadriven"] },
    async ({ page }) => {
      const testConfig = new TestConfig();
      await page.goto(testConfig.appUrl);
      const homePage = new Homepage(page);
      await homePage.myAccountClk();
      await homePage.LoginClk();
      const loginPage = new Loginpage(page);
      await loginPage.LoginAction(data.email, data.password);

      if (data.expected.toLowerCase() === "success") {
        const myAccount = new MyAccount(page);
        const isLoggedIn = await myAccount.isMyaccountExsist();
        expect(isLoggedIn).toBe(true);
      } else {
        const msg = await loginPage.captureErrorMsg();
        expect(msg).toContain(
          "Warning: No match for E-Mail Address and/or Password.",
        );
      }
    },
  );
}

const csvData = DataProvider.getTestDataFromCsv<LoginTestData>(
  "testData/logindata.csv",
);

for (let data of csvData) {
  test(
    `login test with CSV Data: ${data.testName} @master`,
    { tag: ["@datadriven"] },
    async ({ page }) => {
      const testConfig = new TestConfig();
      await page.goto(testConfig.appUrl);
      const homePage = new Homepage(page);
      await homePage.myAccountClk();
      await homePage.LoginClk();
      const loginPage = new Loginpage(page);
      await loginPage.LoginAction(data.email, data.password);

      if (data.expected.toLowerCase() === "success") {
        const myAccount = new MyAccount(page);
        const isLoggedIn = await myAccount.isMyaccountExsist();
        expect(isLoggedIn).toBe(true);
      } else {
        const msg = await loginPage.captureErrorMsg();
        expect(msg).toContain(
          "Warning: No match for E-Mail Address and/or Password.",
        );
      }
    },
  );
}
