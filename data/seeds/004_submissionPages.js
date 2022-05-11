const { faker } = require('@faker-js/faker');

const submissionPages = [
  {
    submissionId: faker.datatype.number(),
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
    submissionId: faker.datatype.number(),
    type: faker.random.word(),
    url: faker.internet.url(),
    pageNum: faker.datatype.number(),
  },
  {
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
