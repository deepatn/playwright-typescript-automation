import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

export interface CustomWorld extends World {
  browser: Browser;
  page: Page;
  poManager: any;
  orderIdTrimmed?: string;
}

export class PlaywrightWorld extends World implements CustomWorld {
  browser!: Browser;
  page!: Page;
  poManager: any;
  orderIdTrimmed?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
