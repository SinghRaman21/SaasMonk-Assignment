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

const updatedRating = '5';
const updateReviewerName = 'Rewati';
const UpdatedComment = 'Mja nhi aya';

//Create New Movie,added the review,edited the review and  verified the review
test.fixme('TC_07 Edit Review and Verify @bug', async ({ page }) => {
  
  await common.addReview({page},movieName,Rating,reviewerName,Comment);

  await page.getByText(movieName).click();
  await page.waitForTimeout(5000); 

  await common.editReview({page},updatedRating,updateReviewerName,UpdatedComment)

  await page.waitForTimeout(3000); 

  await common.verifyReview({page},movieName,updatedRating,updateReviewerName,UpdatedComment)
  await page.goBack();
  //the test will fail bcz below step will fail as the overall rating show +1 whatever the rating is provided
  await common.verifyMovieRatingonHomePage({page},movieName,updatedRating)
  
})


