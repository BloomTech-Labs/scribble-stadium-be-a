const { faker } = require('@faker-js/faker');

const matchups = [
  {
    episodeDate: faker.date.past(),
  }
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('matchups')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('matchups').insert(matchups);
    });
};
