const { faker } = require('@faker-js/faker');

const stories = [
  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
  },

  {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
  },

  {
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
