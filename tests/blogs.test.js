const mongoose = require('mongoose');
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

afterAll(async () => {
  // Close MongoDB connection after all tests are completed
  await mongoose.connection.close();
});

// like a container
// we got an error saying describe doesn't return a promise so we can't use async
describe('when logged in', () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('can see blog creation form', async () => {
    const label = await page.getContentsOf('form label');
    expect(label).toEqual('Blog Title');
  });

  describe('and using valid inputs', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My title'); //takes selector and text to be typed
      await page.type('.content input', 'My content'); //takes selector and text to be typed
      await page.click('form button');
    });

    test('Submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });

    test('Submitting then saving adds blog to index page', async () => {
      await page.click('button.green');

      await page.waitForSelector('.card');

      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');

      expect(title).toEqual('My title');
      expect(content).toEqual('My content');
    });
  });

  describe('and using invalid input', () => {
    /*
     *test
     */
    beforeEach(async () => {
      await page.click('form button');
    });
    test('the form shows an error message', async () => {
      let titleError = await page.getContentsOf('.title .red-text');
      let contentError = await page.getContentsOf('.content .red-text');
      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});

describe('User is not logged in', () => {
  const actions = [
    {
      method: 'get',
      path: '/api/blogs',
    },
    {
      method: 'post',
      path: '/api/blogs',
      data: {
        title: 'T',
        content: 'C',
      },
    },
  ];

  test('Blog related actions are prohibited', async () => {
    const results = await page.execRequests(actions);

    for (let result of results) {
      expect(result).toEqual({ error: 'You must log in!' });
    }
  });
});

//describe('user is not logged in', () => {
//   test('User cannot create a blog post', async () => {
//     // Evaluate
//     const result = await page.post('/api/blogs', {
//       title: 'T',
//       content: 'C',
//     });

//     // console.log(result);
//     //{ status: 401, data: { error: 'You must log in!' } }

//     expect(result.status).toBe(401); // Assuming 401 Unauthorized for unauthenticated requests
//     expect(result.data).toEqual({ error: 'You must log in!' });
//     //expect(result.data).toBeDefined(); // Assuming the API returns an error message
//   });

//   test('User can not get a list of posts', async () => {
//     // Evaluate
//     const result = await page.get('/api/blogs');

//     console.log(result);

//     expect(result).toEqual({ error: 'You must log in!' });
//   });
// });
