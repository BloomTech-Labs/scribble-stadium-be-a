const db = require('../../data/db-config');

function getAllSubmissions() {
  return db('submissions').orderBy('id');
}

function getSubmissionByChildId(childId) {
  return db('submissions').where({ childId });
}

const addSubmission = async (submission) => {
  return db('submissions').insert(submission).returning('*');
};

async function updateSubmissionBySubmissionId(id, changes) {
  return db('submissions')
    .where({ id: id })
    .first()
    .update(changes)
    .returning('*');
}

//rename to addSubmissionPage
async function addS3Submission(submission) {
  return db('submissionPages').insert(submission).returning('*');
  // const [newS3Img] = await db('s3').insert(imgUrl).returning('*');
  // return newS3Img;
}

function getAllSubmissionPages() {
  return db('submissionPages').select('*');
}
module.exports = {
  getAllSubmissions,
  getSubmissionByChildId,
  addSubmission,
  updateSubmissionBySubmissionId,
  addS3Submission,
  getAllSubmissionPages,
};
