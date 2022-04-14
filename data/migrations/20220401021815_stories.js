exports.up = function (knex) {
  return knex.schema.createTable('stories', (table) => {
    table.string('id').primary();
    table.string('title');
    table.string('description');
    table.string('author');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('stories');
};
