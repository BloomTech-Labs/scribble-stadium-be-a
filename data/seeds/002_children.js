exports.seed = function (knex) {
  return knex('children')
    .truncate()
    .then(function () {
      return knex('children').insert([
        {
          id: 1,
          parentId: 'auth0|614025c94fec6d00682bf2a6',
          name: 'Claire Marie',
          pin: 1234,
        },
        {
          id: 2,
          parentId: 'auth0|614025c94fec6d00682bf2a6',
          name: 'Audrey Belle',
          pin: 1234,
        },
        {
          id: 3,
          parentId: 'auth0|614025c94fec6d00682bf2a6',
          name: 'Marcus Aurelius',
          pin: 1234,
        },
        {
          id: 4,
          parentId: 'auth0|62bb71f456952cd3edab1f35',
          name: 'Blair Sinclair',
          pin: 1234,
        },
        {
          id: 5,
          parentId: 'auth0|62bb71f456952cd3edab1f35',
          name: 'Dustin Sinclair',
          pin: 1234,
        },
        {
          id: 7,
          parentId: 'auth0|62bb721a8ece54f5737a398c',
          name: 'Muffy Crowntop',
          pin: 1234,
        },
        {
          id: 8,
          parentId: 'auth0|62bb721a8ece54f5737a398c',
          name: 'Ben Crowntop',
          pin: 1234,
        },
        {
          id: 9,
          parentId: 'auth0|62bb723a112fd45937b86821',
          name: 'John Smith',
          pin: 1234,
        },
        {
          id: 10,
          parentId: 'auth0|62bb723a112fd45937b86821',
          name: 'Ruby Smith',
          pin: 1234,
        },
      ]);
    });
};
