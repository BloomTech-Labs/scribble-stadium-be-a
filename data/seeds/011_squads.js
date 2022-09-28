const squads = [
  {
    childId: 1,
    subId: 1,
    teammateSubId: 2,
    myDrawPoints: 40,
    myWritePoints: 60,
    teammateDrawPoints: 60,
    teammateWritePoints: 40
  },
  {
    childId: 2,
    subId: 2,
    teammateSubId: 1,
    myDrawPoints: 60,
    myWritePoints: 40,
    teammateDrawPoints: 40,
    teammateWritePoints: 60
  },
  {
    childId: 3,
    subId: 3,
    teammateSubId: 4,
    myDrawPoints: 40,
    myWritePoints: 60,
    teammateDrawPoints: 60,
    teammateWritePoints: 40
  },
  {
    childId: 4,
    subId: 4,
    teammateSubId: 3,
    myDrawPoints: 60,
    myWritePoints: 40,
    teammateDrawPoints: 40,
    teammateWritePoints: 60
  }
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('squads')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('squads').insert(squads);
    });
};
