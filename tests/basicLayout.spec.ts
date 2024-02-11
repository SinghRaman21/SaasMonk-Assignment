import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
});




  test('TC_01 Verify the Basic Layout', async ({ page }) => {
    await expect(page).toHaveTitle(/Movie Reviews/);
    await expect(page.getByRole('button', { name: 'Add new movie' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add new review' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'movie-critic MOVIECRITIC' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The best movie review site!' })).toBeVisible();
    await expect(page.getByPlaceholder('Search for your favorite movie')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Follow us on Instagram' })).toBeVisible();



});   

 


