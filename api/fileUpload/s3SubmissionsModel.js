const db = require('../../data/db-config');

async function addS3Submission(imgUrl) {
  return db('s3Submissions').insert(imgUrl).returning('*');
  // const [newS3Img] = await db('s3').insert(imgUrl).returning('*');
  // return newS3Img;
}

function getAllS3Submissions() {
  return db('s3Submissions');
}

function getS3Submission(id) {
  return db('s3Submissions').where({ id: id });
}

module.exports = {
  addS3Submission,
  getS3Submission,
  getAllS3Submissions,
};
