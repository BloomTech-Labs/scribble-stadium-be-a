'use strict';

exports.up = function (knex) {
  return knex.schema.createTable('children', function (table) {
    table.increments('id').primary();
    table.foreign('parentId').references('profiles.id');
    table.string('name');
    table.string('pin');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('children');
};
