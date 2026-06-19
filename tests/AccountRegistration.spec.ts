import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { Homepage } from "../pages/Homepage";
import { Registation } from "../pages/Registration";
import { TestDataUtils } from "../utils/TestDataGenerator";
let homePage: Homepage;
let registartion: Registation;
let testConfig: TestConfig;

test.beforeEach(async ({ page }) => {
  testConfig = new TestConfig();
  await page.goto(testConfig.appUrl);
  homePage = new Homepage(page);
  registartion = new Registation(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("User Registration @master @sanity @regression", async () => {
  await homePage.myAccountClk();
  await homePage.RegisterClk();

  await registartion.fillFName(TestDataUtils.getFirstName());
  await registartion.fillLstName(TestDataUtils.getLastName());
  await registartion.fillEmail(TestDataUtils.getEmail());
  await registartion.fillPhoneNum(TestDataUtils.getPhoneNumber());
  const password = TestDataUtils.getPassword();
  await registartion.fillPass(password);
  await registartion.fillCnfPass(password);
  await registartion.checkPolicy();
  await registartion.submitClk();
  const cnfMsg = await registartion.VerifyCnfMsg();
  expect(cnfMsg).toContain("Your Account Has Been Created!");
});
