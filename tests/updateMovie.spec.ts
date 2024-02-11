import { test, expect, type Page } from '@playwright/test';
import * as common from '../helper/common';
import * as base from '../helper/utils'; 

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
  await common.addNewMovie({page},movieName,date);
  
});
const movieName = 'AutoCars ' + base.random_char(5);
const updatedMovieName = 'Updated Movie ' + base.random_char(2);
const date = '1999-01-21';
const updatedDate = '1999-01-20';


test('TC_03 Update Movie  and verify in UI ', async ({ page }) => {
 await common.updateMovie({page},movieName,updatedMovieName,updatedDate);
 await page.reload();
 await common.verifyMovieName({page},updatedMovieName);
 await common.verifyMovieDate({page},updatedMovieName,updatedDate);

})

