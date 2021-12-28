
exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').notNullable().primary()
        table.text('description').notNullable()
        table.integer('user_id').notNullable()
        table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable()
        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('products');
};