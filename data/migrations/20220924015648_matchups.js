exports.up = function (knex) {
    return knex.schema.createTable('matchups', (table) => {
      table.increments('id').primary();
      table.timestamp('episodeDate');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('matchups');
  };
  