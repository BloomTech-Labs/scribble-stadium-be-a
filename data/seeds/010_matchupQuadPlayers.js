const matchupQuadPlayers = [
  {
    matchupId: 1,
    matchupQuadId: 1,
    subId: 1
  },
  {
    matchupId: 1,
    matchupQuadId: 1,
    subId: 3
  },
  {
    matchupId: 1,
    matchupQuadId: 2,
    subId: 2
  },
  {
    matchupId: 1,
    matchupQuadId: 2,
    subId: 2
  },
  {
    matchupId: 1,
    matchupQuadId: 3,
    subId: 1
  },
  {
    matchupId: 1,
    matchupQuadId: 3,
    subId: 1
  },
  {
    matchupId: 1,
    matchupQuadId: 4,
    subId: 4
  },
  {
    matchupId: 1,
    matchupQuadId: 4,
    subId: 2
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('matchupQuadPlayers')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('matchupQuadPlayers').insert(matchupQuadPlayers);
    });
};
