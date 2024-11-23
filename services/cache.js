const util = require('util');
const mongoose = require('mongoose');
const redis = require('redis');

const redisUrl = 'redis://127.0.0.1:6379';
// const client = redis.createClient(redisUrl);
// promisify the method
// client.hget = util.promisify(client.hget);

// save the original exec method
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = false; // this should be true in but i did false to disable cache system
  this.hashKey = JSON.stringify(options.key || '');
  return this; // chainable
};

// manipulate the original exec function to handle cache
mongoose.Query.prototype.exec = async function () {
  // console.log("i'm about to run a query ");
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);

  if (!this.useCache) {
    return exec.apply(this, arguments);
  } // if the query didn't used cache() method then don't use the cache system below

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // see if we have a value for key
  const cacheValue = await client.hget(this.hashKey, key);

  // if yes return it
  if (cacheValue) {
    const doc = JSON.parse(cacheValue); //this might be array of objects or one object
    console.log('from redis');

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc); // check if it is array of objects
  }

  // otherwise issue the query to db and save it to redis
  const result = await exec.apply(this, arguments); //this will issue query to db

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10); //save it to redis will expire after 10 secs
  console.log('from mongo');
  return result; // this a mongo document
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
