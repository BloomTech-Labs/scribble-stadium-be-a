const { faker } = require('@faker-js/faker');

const storyEpisodePrompts = [
  {
    episodeId: 1,
    type: 'drawing', //drawing or writing
    prompt: faker.lorem.sentence(),
  },
  {
    episodeId: 2,
    type: 'writing', //drawing or writing
    prompt: faker.lorem.sentence(),
  },

  {
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
