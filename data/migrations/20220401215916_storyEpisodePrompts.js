exports.up = function (knex) {
  return knex.schema.createTable('soryEpisodePropmts', (table) => {
    table.increments('id').primary();
    table.integer('episodeId');
    table.string('type').notNullable();
    table.string('prompt').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('soryEpisodePropmts');
};
