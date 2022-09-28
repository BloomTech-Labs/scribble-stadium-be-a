const { faker } = require('@faker-js/faker');

const submissions = [
  {
    childId: 1,
    storyId: 1,
    episodeId: 1,
    squadId: 1,
    matchupId: 1,
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
    episodeId: 1,
    squadId: 2,
    matchupId: 1,
    approvedAt: faker.date.past(),
    episodeStartDate: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },
  {
    childId: 3,
    storyId: 2,
    episodeId: 1,
    squadId: 3,
    matchupId: 1,
    approvedAt: faker.date.past(),
    episodeStartDate: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },
  {
    childId: 4,
    storyId: 3,
    episodeId: 1,
    squadId: 4,
    matchupId: 1,
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
