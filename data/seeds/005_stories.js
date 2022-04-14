const { faker } = require('@faker-js/faker');

// const stories = [...new Array(3)].map((i, idx) => ({
//   id: idx === 0 ? 1 : faker.random.alphaNumeric(4),
//   title: faker.lorem.sentence(),
//   description: faker.lorem.paragraph(),
//   author: faker.name.firstName(),
//   created_at: faker.date.past(),
// }));

const stories = [
  {
    id: 1,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
  },

  {
    id: 2,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
  },

  {
    id: 3,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('stories')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert(stories);
    });
};
