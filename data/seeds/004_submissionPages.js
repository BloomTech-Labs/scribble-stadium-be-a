const { faker } = require('@faker-js/faker');

const submissionPages = [
  {
    submissionId: 1,
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    submissionId: 2,
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    submissionId: 3,
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    submissionId: 4,
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
