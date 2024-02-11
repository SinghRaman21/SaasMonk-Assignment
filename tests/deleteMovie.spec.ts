import { test, expect, type Page } from '@playwright/test';
import * as common from '../helper/common';
import * as base from '../helper/utils'; 

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
  await common.addNewMovie({page},movieName,date);
  
});
const movieName = 'AutoCars ' + base.random_char(5);
const date = '1999-01-21';

//New Movie addedand deleted that movie

test('TC_04 Delete Movie  and verify in UI ', async ({ page }) => {
 await common.deleteMovie({page},movieName);
 await page.reload();
 await expect(page.getByText('movieName')).not.toBeVisible();
})

