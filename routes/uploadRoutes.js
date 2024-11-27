const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

// const s3 = new AWS.S3({
//   accessKeyId: keys.accessKeyId,
//   secretAccessKey: keys.secretAccessKey,
// });// deprecated

const s3 = new AWS.S3(); // it will read the credentials from the .env file
module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'my-blog-bucket-123',
        contentType: 'image/jpeg',
        key, //userId/fsdfsdf.jpeg
      },
      (err, url) => {
        console.log(url); // will e undefined coz we need to get a correct Credentials(keys)
        res.status(200).json({ key: key, url: url });
      }
    );
  });
};
