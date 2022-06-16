const aws = require('aws-sdk');
require('dotenv').config();

// const router = require('express').Router();

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const S3_BUCKET = process.env.BUCKET;
exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = 'bikeImg.jpg'; // Set the file name to bikeImg.jpg to reference the img in a test bucket
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read',
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    // Send it all back
    res.json({ success: true, data: { returnData } });
  });
};

// router.get('/', (req, res) => {
//   console.log('sign_s3');
//   res.json('success from s3 Router');
// });

// module.exports = router;
