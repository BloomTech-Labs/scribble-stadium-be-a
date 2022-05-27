exports.seed = function (knex) {
  return knex('children')
    .truncate()
    .then(function () {
      return knex('children').insert([
        {
          parentId: 'auth0|618aee9bc49d5800691da3ee',
          name: 'Claire Marie',
          pin: 1234,
        },
        {
          parentId: 'auth0|618aee9bc49d5800691da3ee',
          name: 'Audrey Belle',
          pin: 1234,
        },
        {
          parentId: 'auth0|618aee9bc49d5800691da3ee',
          name: 'Marcus Aurelius',
          pin: 1234,
        },
      ]);
    });
};
