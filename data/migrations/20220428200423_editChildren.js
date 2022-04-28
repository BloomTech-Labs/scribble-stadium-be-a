exports.up = function (knex) {
  return knex.schema.alterTable('children', (table) => {
    table.string('parentId').alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('children', (table) => {
    table.integer('parentId').alter();
  });
};
