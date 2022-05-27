const { faker } = require('@faker-js/faker');

const stories = [
  {
    id: 1,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    author: faker.name.firstName(),
  },

  {
    id: 2,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    author: faker.name.firstName(),
  },

  {
    id: 3,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
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
