exports.up = function (knex) {
  return knex.schema.createTable('children', (table) => {
    // table.increments('id').primary();
    table.string('id').primary();
    table.integer('parentId');
    table.string('name').notNullable();
    table.string('pin').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('children');
};
