exports.seed = function (knex) {
  return knex('children')
    .truncate()
    .then(function () {
      return knex('children').insert([
        { id: 1, parentId: 63, name: 'Claire Marie', pin: 1234 },
        { id: 2, parentId: 33, name: 'Audrey Belle', pin: 1234 },
        { id: 3, parentId: 86, name: 'Marcus Aurelius', pin: 1234 },
      ]);
    });
};
