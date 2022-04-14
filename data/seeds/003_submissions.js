const { faker } = require('@faker-js/faker');

// const submissions = [...new Array(3)].map((i, idx) => ({
// id: idx === 0 ? 1 : faker.random.alphaNumeric(),
//     childId: 1,
//     storyId: 1,
//     episodeId: 1,
//     approvedAt: faker.date.past(),
//     finishedReadingAt: faker.date.past(),
//     finishedWritingAt: faker.date.past(),
//     squadCreatedAt: faker.date.past(),
//     votedAt: faker.date.past(),
// }));

const submissions = [
  {
    id: 1,
    childId: 1,
    storyId: 1,
    episodeId: 1,
    approvedAt: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },
  {
    id: 2,
    childId: 2,
    storyId: 2,
    episodeId: 2,
    approvedAt: faker.date.past(),
    finishedReadingAt: faker.date.past(),
    finishedWritingAt: faker.date.past(),
    squadCreatedAt: faker.date.past(),
    votedAt: faker.date.past(),
  },

  {
    id: 3,
    childId: 3,
    storyId: 3,
    episodeId: 3,
    approvedAt: faker.date.past(),
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
