exports.up = function (knex) {
  return knex.schema.createTable('submissionPages', (table) => {
    table.increments('id').primary();
    table.integer('submissionId');
    table.string('type').notNullable();
    table.string('url').notNullable();
    table.integer('pageNum');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('submissionPages');
};
