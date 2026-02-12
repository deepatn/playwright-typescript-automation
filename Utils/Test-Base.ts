import { test as base } from '@playwright/test';

type MyFixtures = {
  testDataforOrder: {
    userName: string;
    password: string;
    productName: string;
  };
};

export const customtest = base.extend<MyFixtures>({
  testDataforOrder: async ({}, use) => {
    await use({
      userName: 'ansika@gmail.com',
      password: 'Iamking@000',
      productName: 'Automation 8',
    });
  },
});
