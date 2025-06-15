import { test, expect } from '@playwright/test';

test.describe('Switchinng window Using Urbanladder Applications', () => {

  test.beforeEach('Launching the URL', async ({ page }) => {

    //launching the URL
    await page.goto("https://www.urbanladder.com/");

    // Expect a title as Demo Web Shop.
    await expect(page).toHaveTitle(/Urban Ladder/);
  });

  test('Login With Valid Credentials', async ({ page }) => {

    await page.locator("ul.header__topBarIconList > li:nth-child(2)").click();
    await page.locator("ul.dropdown>li:nth-child(1)>a").click();
    const popupheadings = page.locator("xpath=//div[text()='Login to explore great designs']");
    await expect(popupheadings).toBeVisible();
    await page.locator("div#password-credentials>input#spree_user_email").click();
    await page.locator("div#password-credentials>input#spree_user_email").fill("yogesh@gmail.com");
    await page.locator("div.password>input:nth-child(1)").click();
    await page.locator("div.password>input:nth-child(1)").fill("Ak9487162553@");
    await page.locator("(//input[@type='submit'])[3]").click();
    await page.waitForTimeout(2000);
    await page.getByText('Living', { exact: true }).click();
    await page.getByRole('link', { name: 'Side & End Tables' }).click();
    await page.waitForTimeout(2000);
    // Switching to new window
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('link', { name: 'Side Tables End Tables Design Hamilton Solid Wood Side Table in Teak Finish' }).click()
    ]);
    await newPage.waitForLoadState();
    // Now interact with the new page
    await newPage.locator('#buy_details_8').getByRole('button', { name: 'Add to Cart' }).click();
    await newPage.close();

  });

  test.afterEach('Closing the Browser', async ({ page }) => {

    await page.locator("ul.header__topBarIconList > li:nth-child(2)").click();
    await page.locator("((//div[@class='header__topBar']//div)[1]//section[3]//ul[1]//li)[2]//ul//li[4]//a").click();
    await page.waitForTimeout(2000);
    await page.close();
  });
});