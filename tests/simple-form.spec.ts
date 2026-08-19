import test from '../lambdatest-setup';
import { expect } from '@playwright/test';

test('Verify Simple Form Demo is succesful', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  const SimpleFormDemoButton = page.getByText('Simple Form Demo');

  await SimpleFormDemoButton.click();

  await expect(page).toHaveURL(/simple-form-demo/);

  const StringValue =  "Welcome to TestMu AI";
  const StringInputField = page.getByPlaceholder('Please enter your Message');
  const GetInputButton = page.getByRole('button', {name : "Get Checked Value"});

  await StringInputField.fill(StringValue);

  await GetInputButton.click();
  
  const displayedText = await page.locator("#message").textContent();
  expect(displayedText).toBe(StringValue);
});
