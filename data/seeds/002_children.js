/*
  ** CREATE 3 CHILDREN **
  id       = 'not sure, need to ask what changed here'
  parentId = int
  name     = string
  pin      = string
*/
// truncate will reset the primary key each time.

// Will use later. Testing without Faker before using it.
//const { faker } = require('@faker-js/faker');

exports.seed = function (knex) {
  return knex('children')
    .truncate()

    .then(function () {
      return knex('children').insert([
        { id: 1, parentId: 63, name: 'Claire Marie', pin: 1234 },
        { id: 2, parentId: 33, name: 'Audrey Belle', pin: 1234 },
        { id: 3, parentId: 86, name: 'Ashley Nicole', pin: 1234 },
      ]);
    });
};

// git checkout feature/seeds

// git pull origin
