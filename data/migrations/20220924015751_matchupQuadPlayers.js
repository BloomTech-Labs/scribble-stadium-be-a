
exports.up = function (knex) {
    return knex.schema.createTable('matchupQuadPlayers', (table) => {
      table.increments('id').primary();
      table.integer('matchupId');
      table.integer('matchupQuadId');
      table.integer('subId')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('matchupQuadPlayers');
  };
  