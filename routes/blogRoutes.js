const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const util = require('util');
const cleanCache = require('../middlewares/cleanCache');

const Blog = mongoose.model('Blog');

module.exports = (app) => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379';
    // const client = redis.createClient(redisUrl);
    // // promisify the method
    // client.get = util.promisify(client.get);
    // // check if we have cached data first
    // const cacheBlogs = await client.get(req.user.id);
    // // this will await the promise to be resolved and store the result
    // // if yes respond with this data
    // if (cacheBlogs) {
    //   console.log('serving from redis cache');
    //   return res.send(JSON.parse(cacheBlogs));
    // }
    // console.log('serving from mongo');
    // else we need to update our cache with that data
    // const blogs = await Blog.find({ _user: req.user.id });
    // res.send(blogs);
    // client.set(req.user.id, JSON.stringify(blogs));

    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id,
    });
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
