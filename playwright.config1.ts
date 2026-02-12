import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
  testDir: './tests',
  retries: 2,
  workers: 3,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { open: 'always' }]],
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on',
       // ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        permissions: ['geolocation']
        //viewport: { width: 720, height: 720 }
      }
    }
  ]
});
module.exports = config;
