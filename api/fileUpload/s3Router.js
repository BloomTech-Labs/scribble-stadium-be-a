const aws = require('aws-sdk');
require('dotenv').config();

const router = require('express').Router();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

router.get('/', (req, res) => {
  console.log('sign_s3');
  res.json('success from s3 Router');
});
module.exports = router;
