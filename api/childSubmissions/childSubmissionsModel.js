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

module.exports = {
  getAllSubmissions,
  getSubmissionByChildId,
  addSubmission,
  updateSubmissionBySubmissionId,
};
