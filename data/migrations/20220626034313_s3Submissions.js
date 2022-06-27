exports.up = function (knex) {
  return knex.schema.createTable('s3Submissions', (table) => {
    table.increments('id').primary();
    table.string('url');
    table.timestamp('uploaded_at');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('s3Submissions');
};
