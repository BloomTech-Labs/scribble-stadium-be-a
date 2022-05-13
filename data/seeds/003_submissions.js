const { faker } = require('@faker-js/faker');

const submissions = [
  {
    childId: 1,
    storyId: 1,
    episodeId: 1,
    approvedAt: faker.date.past(),
    episodeStartDate: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },
  {
    childId: 2,
    storyId: 2,
    episodeId: 2,
    approvedAt: faker.date.past(),
    episodeStartDate: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },

  {
    childId: 3,
    storyId: 3,
    episodeId: 3,
    approvedAt: faker.date.past(),
    episodeStartDate: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('submissions')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('submissions').insert(submissions);
    });
};
