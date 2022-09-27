const db = require('../../data/db-config');

function getAllSquads() {
  return db('squads').orderBy('id');
}

function getSquadBySquadId(id) {
  return db('squads').where({ id });
}

async function updateSquadBySquadId(id, changes) {
  return db('squads').where({ id: id }).first().update(changes).returning('*');
}

async function getSquadbySubId(subId) {
  return db('squads').where({ subId });
}

const addSquad = async (squad) => {
  return db('squads').insert(squad).returning('*');
};

module.exports = {
  getAllSquads,
  getSquadBySquadId,
  updateSquadBySquadId,
  getSquadbySubId,
  addSquad,
};
