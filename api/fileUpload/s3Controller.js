// var aws = require('aws-sdk');
// const { exit } = require('process');

// // require('dotenv').config(); // Configure dotenv to load in the .env file
// // Configure aws with your accessKeyId and your secretAccessKey
// // aws.config.update({
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.AWS_SECRET_KEY,
// // });

// const S3_BUCKET = process.env.BUCKET;
// // Now lets export this function so we can call it from somewhere else
// exports.sign_s3 = (req, res) => {
//   console.log('sign_s3');
//   res.json({});
//   exit();
//   const options = {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     endpoint: `https://${S3_BUCKET}.s3.amazonaws.com`,
//   };
//   const s3 = new aws.S3(options); // Create a new instance of S3
//   console.log('got s3');
//   const fileName = req.body.fileName;
//   const fileType = req.body.fileType;
//   // Set up the payload of what we are sending to the S3 api
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 500,
//     ContentType: fileType,
//     ACL: 'public-read',
//   };
//   console.log('get signed url');
//   // Make a request to the S3 API to get a signed URL which we can use to upload our file
//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     console.log(data);
//     if (err) {
//       console.log(err);
//       res.json({ success: false, error: err });
//     }
//     console.log(data);
//     // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
//     };
//     // Send it all back
//     res.json({ success: true, data: { returnData } });
//   });
// };
