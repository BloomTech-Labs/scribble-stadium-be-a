const db = require('../../data/db-config');

function getAllMatchups() {
  return db('matchups').orderBy('id');
}

function getMatchupBySubId(subId) {
  return db('matchups').where({ subId });
}

async function updateMatchupByMatchupId(id, changes) {
  return db('matchups')
    .where({ id: id })
    .first()
    .update(changes)
    .returning('*');
}

module.exports = {
  getAllMatchups,
  getMatchupBySubId,
  updateMatchupByMatchupId,
};
