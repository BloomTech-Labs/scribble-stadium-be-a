const db = require('../../data/db-config');

function getAllSquads() {
  return db('squads').orderBy('id');
}

function getSquadsByChildId(childId) {
  return db('squads').where({ childId });
}

async function updateSquadBySquadId(id, changes) {
  return db('squads').where({ id: id }).first().update(changes).returning('*');
}

async function getSquadbySubId(subId) {
  return db('squads').where({ subId });
}

module.exports = {
  getAllSquads,
  getSquadsByChildId,
  updateSquadBySquadId,
  getSquadbySubId,
};
