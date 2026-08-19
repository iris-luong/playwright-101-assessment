import test from '../lambdatest-setup';
import { expect } from '@playwright/test';

test('Verify Drag and Drop is succesful', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  const DragAndDropButton = page.getByText('Drag & Drop Sliders');

  await DragAndDropButton.click();

  const Slider15 = page.locator('#slider3');
  const DragSlider15 = Slider15.locator("input[type='range']");
  const DragOutput = await Slider15.locator("output#rangeSuccess");
  const BoxSize = await DragSlider15.boundingBox();
  
  const startX = Number(BoxSize?.x) + Number(BoxSize?.width) * 0.15;
  const endX = Number(BoxSize?.x) + Number(BoxSize?.width) * 0.93;
  const centerY = Number(BoxSize?.y) + Number(BoxSize?.height) / 2;

  await page.mouse.move(startX, centerY);
  await page.mouse.down();
  await page.mouse.move(endX, centerY, { steps: 20 });
  await page.mouse.up();
  await page.mouse.move(0, 0);

  
  await expect(DragOutput).toHaveText('95')
});
