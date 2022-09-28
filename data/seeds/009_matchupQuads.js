const matchupQuads = [
  {
    matchupId: 1,
    quad: 1,
    pageType: 'writng',
    totalPoints: 200,
    winnerSubId: 1,
  },
  {
    matchupId: 1,
    quad: 2,
    pageType: 'writng',
    totalPoints: 200,
    winnerSubId: 2,
  },
  {
    matchupId: 1,
    quad: 3,
    pageType: 'drawing',
    totalPoints: 200,
    winnerSubId: 3,
  },
  {
    matchupId: 1,
    quad: 4,
    pageType: 'drawing',
    totalPoints: 200,
    winnerSubId: 4,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('matchupQuads')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('matchupQuads').insert(matchupQuads);
    });
};
