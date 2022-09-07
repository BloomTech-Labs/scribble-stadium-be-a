exports.up = function (knex) {
  return knex.schema.createTable('submissions', (table) => {
    table.increments('id').primary();
    table.integer('childId');
    table.integer('squadId');
    table.integer('matchupId');
    table.integer('storyId');
    table.integer('episodeId');
    table.timestamp('approvedAt');
    table.timestamp('episodeStartDate');
    table.timestamp('finishedReadingAt');
    table.timestamp('finishedWritingAt');
    table.timestamp('squadCreatedAt');
    table.timestamp('votedAt');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('submissions');
};
