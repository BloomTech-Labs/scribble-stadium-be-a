const db = require('../../data/db-config');

function getAllMatchups() {
  return db('matchups').orderBy('id');
}

async function getMatchupQuadsbyMatchupId(id) {
  return await db('matchupQuads').where('matchupId', id);
}

async function getMatchupQuadPlayersbyMatchupId(id) {
  return await db('matchQuadPlayers').where('matchupId', id);
}

async function getMatchupByMatchupId(id) {
  const matchup = await db('matchups').where({ id });
  matchup.quads = getMatchupQuadsbyMatchupId(id);
  matchup.players = getMatchupQuadPlayersbyMatchupId(id);
  return matchup;
}

async function addMatchup(matchup) {
  return db('matchups').insert(matchup).returning('*');
}

module.exports = {
  getAllMatchups,
  getMatchupByMatchupId,
  addMatchup,
  getMatchupQuadsbyMatchupId,
  getMatchupQuadPlayersbyMatchupId,
};
