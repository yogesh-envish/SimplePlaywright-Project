import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Demo Web Shop");

  const customerservice = page.locator('div.column.customer-service');

  //scrolling to the particular element if needed
  await customerservice.scrollIntoViewIfNeeded();

  //find the blog locator and clicks the blog option in the list
  const blogbutton = page.locator("div.customer-service > ul > li:nth-child(3) > a");
  await blogbutton.click();

  await page.waitForURL("**/blog");

  //verifying the page should have the  below URL
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/blog");

  const expectedtext = page.locator("div.block-blog-archive > div > strong");

  await expect(expectedtext).toHaveText("Blog archive");
});
