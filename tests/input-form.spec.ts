import test from '../lambdatest-setup';
import { expect } from '@playwright/test';

test('Verify Input Form is succesful', async ({ page }) => {

    await page.goto('https://www.testmuai.com/selenium-playground/');

    const InputFormSubmitText = page.getByText('Input Form Submit');

    await InputFormSubmitText.click();

    const SubmitButton = await page.getByRole('button', {name: 'Submit'});
    await SubmitButton.click();

    const NameField = page.locator("input[placeholder='Name']");
    const AlertMessage = await NameField.evaluate((el) => (el as HTMLInputElement).validationMessage);
    await expect(AlertMessage).toBe('Please fill out this field.');

    const EmailField = page.locator("input[placeholder='Email']");
    const PasswordField = page.locator("input[placeholder='Password']");
    const CompanyField = page.locator("input[placeholder='Company']");
    const WebsiteField = page.locator("input[placeholder='Website']");
    const CountryDropdown = page.locator("select[name='country']");
    const CityField = page.locator("input[placeholder='City']");
    const Address1Field = page.locator("input[placeholder='Address 1']");
    const Address2Field = page.locator("input[placeholder='Address 2']");
    const StateField = page.locator("input[placeholder='State']");
    const ZipCodeField = page.locator("input[placeholder='Zip code']");

    await NameField.fill("A");
    await EmailField.fill("A@gmail.com");
    await PasswordField.fill("A");
    await CompanyField.fill("A");
    await WebsiteField.fill("A");
    await CountryDropdown.selectOption('AF');
    await CityField.fill("A");
    await Address1Field.fill("A");
    await Address2Field.fill("A");
    await StateField.fill("A");
    await ZipCodeField.fill("A");

    await SubmitButton.click();

    const SuccessfulMessage = await page.locator("p.success-msg");
    await expect(await SuccessfulMessage).toHaveText("Thanks for contacting us, we will get back to you shortly.");
});
