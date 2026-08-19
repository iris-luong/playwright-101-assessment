import * as base from '@playwright/test';
import path from 'path';
import { chromium } from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();

const modifyCapabilities = (
  configName: string,
  testName: string
) => {
  const config = configName.split('@lambdatest')[0];

  const [browserName, browserVersion, platform] = config.split(':');

  return {
    browserName: browserName || 'Chrome',
    browserVersion: browserVersion || 'latest',

    'LT:Options': {
      platform: platform || 'Windows 10',
      build: 'Playwright 101 Build',
      name: testName,

      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,

      network: true,
      video: true,
      console: true,
      tunnel: false,
      tunnelName: '',
      geoLocation: '',
    },
  };
};

const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {

    if (testInfo.project.name.includes('@lambdatest')) {

      const fileName = testInfo.file
        .split(path.sep)
        .pop();

      // Create capabilities riêng cho từng test/project
      const capabilities = modifyCapabilities(
        testInfo.project.name,
        `${testInfo.title} - ${fileName}`
      );

      const browser = await chromium.connect({
        wsEndpoint:
          `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities)
          )}`,
      });

      const ltPage = await browser.newPage(
        testInfo.project.use
      );

      await use(ltPage);

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark:
            testInfo.error?.stack ||
            testInfo.error?.message ||
            '',
        },
      };

      await ltPage.evaluate(
        () => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`
      );

      await ltPage.close();
      await browser.close();

      return;
    }

    await use(page);
  },
});

export default test;