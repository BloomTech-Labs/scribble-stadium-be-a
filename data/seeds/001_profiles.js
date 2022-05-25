const { faker } = require('@faker-js/faker');

// const fakeProfiles = [...new Array(4)].map((i, idx) => ({
//   id: idx === 0 ? '614025c94fec6d00682bf2a6' : faker.random.alphaNumeric(20),
//   avatarUrl: faker.image.avatar(),
//   email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
//   name:
//     idx === 0
//       ? 'Test001 User'
//       : `${faker.name.firstName()} ${faker.name.lastName()}`,
// }));

const parentProfile = {
  id: 'auth0|618aee9bc49d5800691da3ee',
  avatarUrl: faker.image.avatar(),
  email: 'llama001@maildrop.cc',
  name: 'Marty McFly',
  role: 'parent',
};

const adminProfile = {
  id: 'auth0|628288c99e688d006929c236',
  avatarUrl: faker.image.avatar(),
  email: 'llama002@maildrop.cc',
  name: 'Darwin Graig',
  role: 'admin',
};

const profiles = [parentProfile, adminProfile];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
