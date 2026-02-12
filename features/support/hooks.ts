import { Before, After, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { PlaywrightWorld } from './world';

Before(async function (this: PlaywrightWorld) {
  await this.init();
});

After(async function (this: PlaywrightWorld) {
  await this.close();
});

BeforeStep(async function (this: PlaywrightWorld) {
});

AfterStep(async function (this: PlaywrightWorld, {result}) {
  if(result.status == Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
});

