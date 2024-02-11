import { test, expect, type Page } from '@playwright/test';
import * as common from '../helper/common';
import * as base from '../helper/utils'; 

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
  await common.addNewMovie({page},movieName,date);
  
});

const movieName = 'AddReview ' + base.random_char(5);
const date = '1999-01-21';
const Rating = '10';
const reviewerName = 'Raman';
const Comment = 'Aweosme Movie';

//Create New Movie,added the review and deleted the review
test('TC_08 Delete Review and Verify', async ({ page }) => {
  
  await common.addReview({page},movieName,Rating,reviewerName,Comment);
  await page.getByText(movieName).click();
  await page.waitForTimeout(5000); 

  await common.deleteReview({page});

})


