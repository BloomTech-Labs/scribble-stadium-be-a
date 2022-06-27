const { faker } = require('@faker-js/faker');

const s3Submissions = [
  {
    id: faker.datatype.number(),
    url: faker.internet.url(),
    uploaded_at: faker.date.past(),
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('s3Submissions')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('s3Submissions').insert(s3Submissions);
    });
};
