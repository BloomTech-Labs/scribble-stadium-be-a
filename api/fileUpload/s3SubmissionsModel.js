const db = require('../../data/db-config');

async function addSubmissionPage(imgUrl) {
  return db('s3Submissions').insert(imgUrl).returning('*');
}

function getAllS3Submissions() {
  return db('s3Submissions');
}

function getS3Submission(id) {
  return db('s3Submissions').where({ id: id });
}

module.exports = {
  addSubmissionPage,
  getS3Submission,
  getAllS3Submissions,
};
