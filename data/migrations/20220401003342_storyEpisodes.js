exports.up = function (knex) {
  return knex.schema.createTable('storyEpisodes', (table) => {
    table.increments('id').primary();
    table.integer('storyId').notNullable();
    table.integer('episodeNum').notNullable();
    table.string('textImgUrl');
    table.string('audioUrl');
    table.text('content');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('storyEpisodes');
};
