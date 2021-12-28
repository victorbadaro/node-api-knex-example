
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').notNullable().primary()
        table.text('name').notNullable()
        table.text('email').unique().notNullable()
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};