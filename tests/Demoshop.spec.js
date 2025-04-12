import { test, expect } from '@playwright/test';

test.describe('Demo Shop Application', () => {

  test.beforeEach('Launching the URL', async ({ page }) => {

    //launching the URL
    await page.goto('https://demowebshop.tricentis.com/');

    // Expect a title as Demo Web Shop.
    await expect(page).toHaveTitle("Demo Web Shop");

  });

  test.skip('Lauch the URL and Verfying the Blog Option', async ({ page }) => {

    const customerservice = page.locator('div.column.customer-service');

    //scrolling to the particular element if needed
    await customerservice.scrollIntoViewIfNeeded();

    //find the blog locator and clicks the blog option in the list
    const blogbutton = page.locator("div.customer-service > ul > li:nth-child(3) > a");
    await blogbutton.click();

    //Waiting for the blog page load

    await page.waitForURL("**/blog");

    //verifying the page should have the  below URL
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/blog");

    const expectedtext = page.locator("div.block-blog-archive > div > strong");

    await expect(expectedtext).toHaveText("Blog archive");
  });

  test('Trying to Regiter and Login if already Registered ', async ({ page }) => {

    //We can change the input and the input should be like in this format "Male" and "Female"
    let genderinput = "Male";

    //Just defining the input here.
    let fnameinput = "Yogesh";
    let Lnameinput = "A K";
    let emailinput = "yogeshyogesh@gmail.com"
    const passinput = "AK9487162553"

    //Clicking  the Register Button
    await page.locator("//ul//li//a[text()='Register']").click();

    //Added some assertions for the name fields
    const youdetailstitle = page.locator("xpath=//div//strong[text()='Your Personal Details']");
    await expect(youdetailstitle).toHaveText("Your Personal Details");
    const Gendertitle = page.locator("xpath= //div//label[text()='Gender:']");
    await expect(Gendertitle).toHaveText("Gender:");
    const fnametitle = page.locator("xpath=//div//label[text()='First name:']");
    await expect(fnametitle).toHaveText("First name:");
    const lnametitle = page.locator("xpath=//div//label[text()='Last name:']");
    await expect(lnametitle).toHaveText("Last name:");
    const emailtitle = page.locator("xpath=//div//label[text()= 'Email:']");
    await expect(emailtitle).toHaveText("Email:");
    const passtitle = page.locator("xpath=//div//strong[text()='Your Password']");
    await expect(passtitle).toHaveText("Your Password");
    const passtitle1 = page.locator('xpath=//div//label[text()= "Password:"]');
    await expect(passtitle1).toHaveText("Password:");
    const passtitle2 = page.locator('xpath=//div//label[text()= "Confirm password:"]');
    await expect(passtitle2).toHaveText("Confirm password:");

    //Selecting the Gender
    if (genderinput == "Male") {
      await page.locator("div.gender > input#gender-male").click();
    } else if (genderinput == "Female") {
      await page.locator("div.gender > input#gender-female").click();
    } else {
      console.log("Not working");
    }

    //Filling all the Required fields
    await page.locator('div.inputs > input#FirstName').fill(fnameinput);
    await page.locator('div.inputs > input#LastName').fill(Lnameinput);
    await page.locator('div.inputs > input#Email').fill(emailinput);
    await page.locator("xpath=//input[@id='Password']").fill(passinput);
    await page.locator('xpath=//input[@id="ConfirmPassword"]').fill(passinput);


    //Expecting the register button should be visible and clickable
    const registerbtn = page.locator("div > input#register-button")
    await registerbtn.isVisible();
    await registerbtn.click();
    await page.pause(2);

    //If already registered then the system click on login or else it will continue to the next steps
    const Alreadyexistmsg = page.locator("xpath=//div//ul//li[text()='The specified email already exists']");

    if (await Alreadyexistmsg.isVisible()) {
      //clicking on the login link and verifying its visible or not 

      const loginlink = page.locator("xpath=//ul//li//a[text()='Log in']");
      await loginlink.isVisible();
      await loginlink.click();

      //Entering the email and password and clickss on login submit button

      await page.locator('div.inputs > input#Email').fill(emailinput);
      await page.locator("xpath=//input[@id='Password']").fill(passinput);
      const loginsubmitbut = page.locator("div> input.login-button");
      await loginsubmitbut.click();

      //Just verfiying logged in or not
      const emaillink = page.locator("xpath=(//ul//li//a[@class='account'])[1]");
      await emaillink.isVisible()
      await expect(emaillink).toHaveText(emailinput);

    } else {
      const registertitle = page.locator("xpath=//div//h1[text()='Register']");
      await expect(registertitle).toHaveText("Register");

      const registersuccessmsg = page.locator("xpath=//div//div[@class='result']");
      await expect(registersuccessmsg).toHaveText("Your registration completed");

      const continuebutton = page.locator('div.buttons > input.register-continue-button');
      await continuebutton.click();
    }

  });

  test.afterEach('Loggig  out from the application',async ({ page }) => {

    //For now logginout for each case
    const logoutbtn = page.locator("xpath=//ul//li//a[text()='Log out']");
    await logoutbtn.click();
  })
})