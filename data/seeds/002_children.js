exports.seed = function (knex) {
  return knex('children')
    .truncate()
    .then(function () {
      return knex('children').insert([
        {
          parentId: '614025c94fec6d00682bf2a6',
          name: 'Claire Marie',
          pin: 1234,
        },
        {
          parentId: '614025c94mmm6d00682bf2a6',
          name: 'Audrey Belle',
          pin: 1234,
        },
        {
          parentId: '614025c94nnn6d00682bf2a6',
          name: 'Marcus Aurelius',
          pin: 1234,
        },
      ]);
    });
};
