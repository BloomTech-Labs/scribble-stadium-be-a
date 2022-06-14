const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('sign_s3');
  res.json('success from s3 Router');
});
module.exports = router;
