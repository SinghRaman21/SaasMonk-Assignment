import { test, expect, type Page } from '@playwright/test';
import * as common from '../helper/common';
import * as base from '../helper/utils'; 

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
  
});

const movieName = 'AutoCars ' + base.random_char(5);
const date = '1999-01-21';

//New Movie added and Verified that created movie is present
test('TC_02 Add New  Movie and verify in UI ', async ({ page }) => {
  await common.addNewMovie({page},movieName,date);
  await page.reload();
  await common.verifyMovieName({page},movieName);
  await common.verifyMovieDate({page},movieName,date);
  await common.verifyMovieRatingonHomePage({page},movieName,'None')
})


