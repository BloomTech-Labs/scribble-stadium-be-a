const express = require('express');
const router = express.Router();
// const aws = require('aws-sdk');

router.get('/', function (req, res) {
  console.log('sign_s3');
  res.json({});
});

module.exports = router;
