/*
  Manually setting the `id` for each profile to the Auth0 provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/
profiles = [
  {
    email: 'llama001@maildrop.cc',
    name: 'Test001 User',
    id: 'auth0|614025c94fec6d00682bf2a6',
    role: 'parent',
    avatarUrl: 'https://s.gravatar.com/avatar/dca14075e1a5060bc748cddf77cd2c9c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fll.png',
  },
  {
    email: 'llama002@maildrop.cc',
    name: 'Test002 User',
    id: 'auth0|62bb71f456952cd3edab1f35',
    role: 'parent',
    avatarUrl: 'https://s.gravatar.com/avatar/cbea34f8cb8b8766baa9f18b4cdd9e73?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fll.png',
  },
  {
    email: 'llama003@maildrop.cc',
    name: 'Test003 User',
    id: 'auth0|62bb721a8ece54f5737a398c',
    role: 'parent',
    avatarUrl: 'https://s.gravatar.com/avatar/db4516fb09d1066c4bd303fe0bd82fa9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fll.png',
  },
  {
    email: 'llama004@maildrop.cc',
    name: 'Test004 User',
    id: 'auth0|62bb723a112fd45937b86821',
    role: 'parent',
    avatarUrl: 'https://s.gravatar.com/avatar/0377b2b316037afb070f68beaae17bf7?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fll.png',
  },
  {
    email: 'llama007@maildrop.cc',
    name: 'Test007 User',
    id: 'auth0|614a6b0c8f29ac00711b6abd',
    role: 'admin',
    avatarUrl: 'https://s.gravatar.com/avatar/94d571a39cddffd878490238a04155da?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fll.png',
  },
];

exports.seed = function (knex) {
  return knex('profiles').insert(profiles);
};
