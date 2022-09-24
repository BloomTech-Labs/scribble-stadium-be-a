exports.up = function (knex) {
    return knex.schema.createTable('matchupQuads', (table) => {
      table.increments('id').primary();
      table.integer('matchupId');
      table.integer('quad'); // Either 1, 2, 3, or 4
      table.string('pageType');
      table.integer('totalPoints');
      table.integer('winnerSubId');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('matchupQuads');
  };
  