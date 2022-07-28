const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const S3_BUCKET = process.env.BUCKET;

module.exports = { aws, s3UploadBucket: S3_BUCKET };
