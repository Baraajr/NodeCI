const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'eu-north-1', // or your actual region
});

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuidv4()}.png`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'car-parts-bucket-123',
        ContentType: 'image/jpeg',
        Key: key,
        Expires: 180, // optional: URL valid for 60 seconds
      },
      (err, url) => {
        if (err) {
          console.error('S3 Signed URL Error:', err);
          return res
            .status(500)
            .send({ error: 'Failed to generate signed URL' });
        }

        res.status(200).json({ key, url });
      }
    );
  });
};
