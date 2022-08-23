exports.up = function (knex) {
  return knex.schema.createTable('squads', (table) => {
    table.increments('id').primary();
    table.integer('childId');
    table.integer('subId');
    table.integer('teammateSubId');
    table.integer('myDrawPoints');
    table.integer('myWritePoints');
    table.integer('teammateDrawPoints');
    table.integer('teammateWritePoints');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('squads');
};
