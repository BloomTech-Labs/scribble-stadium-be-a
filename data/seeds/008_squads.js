const squads = [
  {
    childId: 1,
    subId: 1,
    teammateSubId: 2,
  },
  {
    childId: 2,
    subId: 2,
    teammateSubId: 1,
  },
  {
    childId: 3,
    subId: 3,
    teammateSubId: 4,
  },
  {
    childId: 4,
    subId: 4,
    teammateSubId: 3,
  },
];

// episodeId, id, type, prompt
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('squads')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('squads').insert(squads);
    });
};
