import { test, expect, type Page } from '@playwright/test';
import * as common from '../helper/common';
import * as base from '../helper/utils'; 

test.beforeEach(async ({ page }) => {
  await page.goto('https://movie-reviews-psi.vercel.app/');
  
  
});


const date = '1999-01-21';
const Rating = '10';
const reviewerName = 'Raman';
const Comment = 'Aweosme Movie';

//Create New Movie,added the review and verified the review
test.fixme('TC_05 Add 1 Review and Verify @bug', async ({ page }) => {
  const movieName = 'AddReview ' + base.random_char(5);
  await common.addNewMovie({page},movieName,date);
  await common.addReview({page},movieName,Rating,reviewerName,Comment);
  await page.getByText(movieName).click();
  await page.waitForTimeout(5000); 
  await common.verifyReview({page},movieName,Rating,reviewerName,Comment)
  await page.goBack();
  //the below step will fail as the overall rating show +1 whatever the rating is provided
  await common.verifyMovieRatingonHomePage({page},movieName,Rating)

})

const movieReviewData = [
  { rating: '10', reviewerName: 'Raman', comment: 'Awesome Movie' },
  { rating: '8', reviewerName: 'John', comment: 'Great Movie' },
 
];


test.fixme(`TC_06 Add multiple reviews @bug`, async ({ page }) => {
  const movieName1 = 'AddReview ' + base.random_char(5);
  await common.addNewMovie({page},movieName1,date);
  for (const reviewData of movieReviewData) {
   
    await common.addReview({ page }, movieName1, reviewData.rating, reviewData.reviewerName, reviewData.comment);
    await page.getByText(movieName1).click();
    await page.waitForTimeout(5000); 
    await expect(page.getByText(reviewData.reviewerName)).toBeVisible(); 
    
  }
  await page.goBack();
  await page.waitForTimeout(5000); 
//this step will fail  Expected: "Rating: 9.00"
 //   Received: "Rating: 18.50"
  await common.verifyMovieRatingonHomePage({page},movieName1,'9')
}
);

//ForFuture   write dynamic function so that it can verifu multiple review using only one function


   
  



