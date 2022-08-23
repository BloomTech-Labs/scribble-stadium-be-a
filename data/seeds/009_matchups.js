const matchups = [
  {
    greenSq1SubId: 1,
    greenSq2SubId: 3,
    greenPageType: "writing",
    greenPoints: 60,
    redSq1SubId: 2,
    redSq2SubId: 4,
    redPageType: "writing",
    redPoints: 40,
    orangeSq1SubId: 1,
    orangeSq2SubId: 3,
    orangePageType: "drawing",
    orangePoints: 40,
    blueSq1SubId: 2,
    blueSq2SubId: 4,
    bluePageType: "drawing",
    bluePoints: 60,
  }
];

// episodeId, id, type, prompt
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('matchups')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('matchups').insert(matchups);
    });
};
