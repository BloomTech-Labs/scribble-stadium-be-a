const db = require('../../data/db-config');

function getAllSquads() {
  return db('squads').orderBy('id');
}

function getSquadsByChildId(childId) {
  return db('squads').where({ childId });
}

const addSquad = async (squad) => {
  return db('squads').insert(squad).returning('*');
};

async function updateSquadBySquadId(id, changes) {
  return db('squads').where({ id: id }).first().update(changes).returning('*');
}

module.exports = {
  getAllSquads,
  getSquadsByChildId,
  addSquad,
  updateSquadBySquadId,
};
