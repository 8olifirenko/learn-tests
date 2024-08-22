import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("wikipedia", async () => {
    test('check links in header wikipedia', async ({ page }) => {
        await page.goto("https://www.wikipedia.org/")
        await page.locator("//a[@id='js-link-box-en']").click();

        await expect(page.locator("//a[@data-mw='interface'][contains(@title, 'create')]")).toBeVisible();
        await expect(page.locator("//a[@data-mw='interface'][contains(@href, 'Login')]")).toBeVisible();
    });

    test("wiki check login nav", async ({ page }) => {
        await page.goto("https://www.wikipedia.org/");
        await page.getByRole('link', { name: 'English 6,847,000+ articles' }).click();
        await page.getByRole('link', { name: 'Log in' }).nth(0).click();

        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    });

    test('check search in wikipedia', async ({ page }) => {
        await page.goto("https://www.wikipedia.org/")
        await page.getByRole('link', { name: 'English 6,847,000+ articles' }).click();
        await page.getByPlaceholder('Search Wikipedia').pressSequentially("JavaScript")
        await page.keyboard.press("Enter")

        await expect(page.getByRole('heading', { name: 'JavaScript', exact: true }).locator('span')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'JavaScript', exact: true }).locator('span')).toHaveText(/JavaScript/);

        await expect(page.locator("//ul[@id='mw-panel-toc-list']/li/a")).toHaveCount(15);
    });

    test('check navigate Steam', async ({ page }) => {
        await page.goto("https://store.steampowered.com/")

        const logo = page.locator('.logo');
        await expect(logo).toBeVisible();

        await page.getByRole('link', { name: 'login' }).click();
        const nameInput = page.locator('#responsive_page_template_content input[type="text"]');
        await expect(nameInput).toBeVisible();
        const passwordInput = page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible();

        const qrSignIn = page.getByText('Or sign in with QRUse the');
        await expect(qrSignIn).toBeVisible();

        await page.goBack();

        await page.getByPlaceholder('search').fill("Dota 2");
        await page.keyboard.press("Enter");
        await page.getByRole('link', { name: 'Dota 2 9 Jul, 2013 Free' }).click();

        await expect(page.locator('#appHubAppName')).toBeVisible();
    });

    // test('search for Async/await on JavaScript.info', async ({ page }) => {
    //     await page.goto('https://javascript.info/');

    //     await page.getByPlaceholder('searchbox', { name: 'Search in the tutorial' }).pressSequentially('Async/await');
    //     await page.keyboard.press('Enter');
    // });
})