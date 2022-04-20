const { faker } = require('@faker-js/faker');

const submissionPages = [
  {
    id: 1,
    submissionId: faker.datatype.number(),
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    id: 2,
    submissionId: faker.datatype.number(),
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    id: 3,
    submissionId: faker.datatype.number(),
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
];

exports.seed = function (knex) {
  return knex('submissionPages')
    .del()
    .then(function () {
      return knex('submissionPages').insert(submissionPages);
    });
};
