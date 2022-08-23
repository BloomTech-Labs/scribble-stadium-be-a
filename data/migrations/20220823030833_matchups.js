exports.up = function (knex) {
    return knex.schema.createTable('matchups', (table) => {
      table.increments('id').primary();
      table.integer('greenSq1SubId');
      table.integer('greenSq2SubId');
      table.string('greenPageType');
      table.integer('greenWinnerId');
      table.integer('greenPoints');
      table.integer('redSq1SubId');
      table.integer('redSq2SubId');
      table.string('redPageType');
      table.integer('redWinnerId');
      table.integer('redPoints');
      table.integer('orangeSq1SubId');
      table.integer('orangeSq2SubId');
      table.string('orangePageType');
      table.integer('orangeWinnerId');
      table.integer('orangePoints');
      table.integer('blueSq1SubId');
      table.integer('blueSq2SubId');
      table.string('bluePageType');
      table.integer('blueWinnerId');
      table.integer('bluePoints');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('matchups');
  };
  