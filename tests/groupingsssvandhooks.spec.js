import { test, expect} from '@playwright/test';

// test.beforeAll(async ({browser}) => {
//     console.log('This is executed before all tests');
//     const page = await browser.newPage();
//     await page.goto('https://demoqa.com');
// });

// test.afterAll(async ({browser}) => {
//     console.log('This is executed after all tests');
//     const page = await browser.newPage();
//     await page.close();
// });

test.beforeEach(async ({page}) => {
    console.log('This is executed before each test');
    await page.goto('https://demoqa.com');
});

test.afterEach(async ({page}) => {
    console.log('This is executed after each test');
    await page.close();
});

test.describe('For screenshots', () => {
    test('Take screenshot of the homepage', async ({page}) => {
        await page.screenshot({ path: 'screenshots/' + Date.now() + 'homepage.png' });
    });

    test('Take full page screenshot of the homepage', async ({page}) => {
        await page.screenshot({ path: 'screenshots/' + Date.now() + 'homepage_fullpage.png', fullPage: true });
    });

    test('Take screenshot of the Elements section', async ({page}) => {
        const elements_section = page.locator("div.home-banner");
        await elements_section.screenshot({ path: 'screenshots/' + Date.now() + 'elements_section.png' });
  });

  test.describe.skip('For screen videos', () => {
    test('Record video of the homepage', async ({page}) => {
        
    });
  });
});