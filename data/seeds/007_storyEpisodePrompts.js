const { faker } = require('@faker-js/faker');

const storyEpisodePrompts = [
  {
    id: 1,
    episodeId: 1,
    type: 'drawing', //drawing or writing
    prompt: faker.lorem.sentence(),
  },
  {
    id: 2,
    episodeId: 2,
    type: 'writing', //drawing or writing
    prompt: faker.lorem.sentence(),
  },

  {
    id: 3,
    episodeId: 3,
    type: 'writing', //drawing or writing
    prompt: faker.lorem.sentence(),
  },
];

// episodeId, id, type, prompt
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('storyEpisodePrompts')
    .truncate()
    .then(function () {
      // inserts seed entries
      return knex('storyEpisodePrompts').insert(storyEpisodePrompts);
    });
};
