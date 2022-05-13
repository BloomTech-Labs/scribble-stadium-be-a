const { faker } = require('@faker-js/faker');

const fakeProfiles = [...new Array(4)].map((i, idx) => ({
  id: idx === 0 ? '614025c94fec6d00682bf2a6' : faker.random.alphaNumeric(20),
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

const parentProfile = {
  id: '614025c94mmm6d00682bf2a6',
  avatarUrl: faker.image.avatar(),
  email: 'llama004@maildrop.cc',
  name: 'parent',
};

const adminProfile = {
  id: '614025c94nnn6d00682bf2a6',
  avatarUrl: faker.image.avatar(),
  email: 'llama005@maildrop.cc',
  name: 'admin',
};

const profiles = [...fakeProfiles, parentProfile, adminProfile];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
