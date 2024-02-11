import { test, expect, type Page } from '@playwright/test';

import * as base from '../helper/utils'; 



export async function addNewMovie({page},movieName:string,date:string){  
   
    await page.getByRole('button', { name: 'Add new movie' }).click();
    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill(movieName);
    await page.locator('#release').fill(date);
    await page.getByRole('button', { name: 'Create Movie' }).click();

    await expect(page.getByText('Successfully Added')).toBeVisible({ timeout: 10000 });
    return movieName;

}
export async function searchandVerifyMovie({page},movieName:string){  

   
    await page.getByPlaceholder('Search for your favorite movie').fill(movieName);
    await expect(page.locator(`//*[@class='text-ellipsis text-lg'][1]`)).toEqual(movieName);


}

export async function verifyMovieName({ page }, movieName: string) {
    const xpath = `//*[text()='${movieName}']`;
    await expect(page.locator(`xpath=${xpath}`)).toBeVisible();
}

export async function verifyMovieDate({ page }, movieName: string,date:string) {
    const TextDate = base.formatDate(date); 
    const xpath = `//*[text()='${movieName}']/parent::header/descendant::time`;
    const actualDate = await page.$eval(`xpath=${xpath}`, element => element.textContent.trim());
    await expect(actualDate).toEqual("Released: "+TextDate);
    
}

export async function verifyMovieRatingonHomePage({ page }, movieName: string,rating:string) { 
    
    
    const xpath = `//*[text()='${movieName}']/parent::header/following-sibling::footer/child::p`;
    await page.waitForSelector(xpath, { state: 'attached' });

    const actualRating = await page.$eval(`xpath=${xpath}`, element => element.textContent.trim());
    if(rating=='None') await expect(actualRating).toMatch(/Rating\s*:\s*None/);
    //below will fail
    else  await expect(actualRating).toEqual("Rating: "+rating+'.00');
    
}


export async function updateMovie({page},movieName:string,updatedMovieName:string,date:string) {
    
    //this xpath find out the movie name and its update button
    const xpath = `//*[@class='text-ellipsis text-lg' and text()='${movieName}']/ancestor::a/following-sibling::div/button[1]`
    await page.locator(`xpath=${xpath}`).click();
    await page.getByPlaceholder('Name').fill(updatedMovieName);
    await page.locator('#release').fill(date);
    await page.getByRole('button', { name: 'Update Movie' }).click();
    await expect(page.getByText('Successfully Updated')).toBeVisible({ timeout: 10000 });
   
    
}

export async function deleteMovie({page},movieName:string) {

    //this xpath find out the movie name and its delete button
    const xpath = `//*[@class='text-ellipsis text-lg' and text()='${movieName}']/ancestor::a/following-sibling::div/button[2]`
    await page.locator(`xpath=${xpath}`).click();
    await expect(page.getByText('Successfully Deleted')).toBeVisible({ timeout: 10000 });
   
}

export async function addReview({page},movieName:string,Rating:string,reviewerName:string,Comment:string) {
    
  
    await page.getByRole('button', { name: 'Add new review' }).click();
    await page.locator('#movie').click();
    await page.selectOption('#movie', { label: movieName });
    await page.getByPlaceholder('Your name').click();
    await page.getByPlaceholder('Your name').fill(reviewerName);
    await page.getByPlaceholder('Rating out of').fill(Rating);
    await page.getByPlaceholder('Review comments').click();
    await page.getByPlaceholder('Review comments').fill(Comment);
    await page.getByRole('button', { name: 'Create Review' }).click();
    await expect(page.getByText('Successfully Added')).toBeVisible({ timeout: 10000 });
   
    
}
export async function verifyReview({page},movieName:string,Rating:string,reviewerName:string,Comment:string) {
    

  const xpathforComment = `//*[@class = 'flex justify-between']//p[1]`;
  const xpathforRating = `//*[@class = 'flex justify-between']//p[2]`;
  const xpathforReviewr = `//*[@class = 'mt-8']//child::em`
  const actualComment = await page.$eval(`xpath=${xpathforComment}`, element => element.textContent.trim());
  await expect(actualComment).toEqual(Comment);
  const actualrating = await page.$eval(`xpath=${xpathforRating}`, element => element.textContent.trim())
  await expect(actualrating).toEqual(Rating+'/10');
  const actualReviewer = await page.$eval(`xpath=${xpathforReviewr}`, element => element.textContent.trim())
  await expect(actualReviewer).toEqual("By " + reviewerName);
   
    
}

export async function editReview({page},updatedRating:string,updateReviewerName:string,UpdatedComment:string){
    await page.getByRole('button').nth(2).click();
    await page.getByPlaceholder('Your name').fill(updateReviewerName);
    await page.getByPlaceholder('Rating out of').fill(updatedRating);
    await page.getByPlaceholder('Review comments').fill(UpdatedComment);
    await page.getByRole('button', { name: 'Update Review' }).click();
    await expect(page.getByText('Successfully Updated')).toBeVisible({ timeout: 10000 });
}

export async function deleteReview({ page }) {

    await page.getByRole('button').nth(3).click();
await expect(page.getByText('Review Deleted')).toBeVisible();
    
}