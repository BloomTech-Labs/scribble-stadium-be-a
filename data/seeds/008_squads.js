const squads = [
  {
    childId: 1,
    subId: 1,
    teammateSubId: 2,
  },
  {
    childId: 3,
    subId: 2,
    teammateSubId: 4,
  },
  {
    childId: 6,
    subId: 5,
    teammateSubId: 5,
  },
  {
    childId: 7,
    subId: 7,
    teammateSubId: 8,
  },
  {
    childId: 9,
    subId: 9,
    teammateSubId: 10,
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
