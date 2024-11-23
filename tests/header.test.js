/**
 * this file is for testing the header html
 * so after logging in the header should be changed
 * •	To test only one methods inside a file that has a lot of functions to be tested
 * u can use the .only after the word test
 */
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Page = require('./helpers/page');

/*
// before refactor
let browser, page; // we defined these to be usable inside any test

// this is to launch a browser before any test
//we don't need to run these lines each time we run a test
beforeEach(async () => {
  // launch a browser with a tab
  browser = await puppeteer.launch({ headless: false }); //headless to see the window

  // create a new tab
  page = await browser.newPage();

  // hit our app
  await page.goto('http://localhost:3000/');
});

//close browser automatically
afterEach(async () => {
  await browser.close();
});
*/

let page;

beforeEach(async () => {
  // this will return a proxy that combine three objects (browser, page,customPage)
  page = await Page.build(); // this will launch a browser and create a page out of it

  // hit our app
  await page.goto('http://localhost:3000/');
});

// close browser automatically
afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  // Close MongoDB connection after all tests are completed
  await mongoose.connection.close();
});

test('header has the correct text', async () => {
  // select an element using css selectors
  const text = await page.$eval('a.brand-logo', (ele) => ele.innerHTML);

  // assert the text
  expect(text).toEqual('Blogster');

  // await browser.close()
});

test('clicking login starts Oauth flow', async () => {
  // click on log in
  await page.click('.right a');

  // page after clicking on log in with googles
  const pageUrl = await page.url();

  // to check if a string contains some particular value
  expect(pageUrl).toMatch(/accounts\.google\.com/);
});

// .only wil make this the only one to be tested
test('when logged in shows a logout button', async () => {
  await page.login(); // settings the cookies and so on

  // select an element using css selectors should be logout
  const text = await page.$eval(
    'a[href="/auth/logout"]',
    (el) => el.textContent
  );

  expect(text).toEqual('Logout');
});
