import knex from '../database';

class UserController {
    async index(request, response) {
        const users = await knex('users');

        return response.json(users);
    }

    async find(request, response) {
        const { id } = request.params;
        const user = await knex('users').where({ id }).limit(1);

        if (user.length === 0)
            return response.status(400).json({ error: 'User not found!' });

        return response.json(user);
    }

    async create(request, response) {
        const { name, email } = request.body;
        const userFoundByEmail = await knex('users').where({ email });

        if (userFoundByEmail.length > 0)
            return response.status(400).json({ error: 'Email already exists!' });

        const user = await knex('users').insert({ name, email }).returning('*');

        return response.status(201).json(user);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email } = request.body;
        const user = await knex('users').where({ id }).limit(1);

        if (user.length === 0)
            return response.status(400).json({ error: 'User not found!' });

        const userFoundByEmail = await knex('users').where({ email }).andWhere('id', '!=', id);

        if (userFoundByEmail.length > 0)
            return response.status(400).json({ error: 'Email already exists!' });

        await knex('users').update({ name, email }).where({ id });

        return response.status(204).send();
    }

    async delete(request, response) {
        const { id } = request.params;
        const user = await knex('users').where({ id }).limit(1);

        if (user.length === 0)
            return response.status(400).json({ error: 'User not found!' });

        await knex('users').del().where({ id });

        return response.status(204).send();
    }
}

export default new UserController();