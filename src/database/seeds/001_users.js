
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Neil Schmidt', email: 'est.nunc@google.net' },
        { name: 'Charissa Walters', email: 'velit.aliquam.nisl@outlook.net' },
        { name: 'Octavius Albert', email: 'diam@aol.net' }
      ]);
    });
};
