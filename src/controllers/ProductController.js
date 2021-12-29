import knex from '../database';

class ProductController {
    async index(request, response) {
        const products = await knex('products').orderBy('id');

        return response.json(products);
    }

    async find(request, response) {
        const { id } = request.params;
        const product = await knex('products').where({ id }).limit(1);

        if (product.length === 0)
            return response.status(400).json({ error: 'Product not found!' });

        return response.json(product);
    }

    async create(request, response) {
        const { description, user_id } = request.body;

        if (!description)
            return response.status(400).json({ error: 'Product description can\'t be null' });

        if (user_id === null)
            return response.status(400).json({ error: 'User ID can\'t be null' });

        const user = await knex('users').where({ id: user_id }).limit(1);

        if (user.length === 0)
            return response.status(400).json({ error: 'User not found!' });

        const product = await knex('products').insert({ description, user_id }).returning('*');

        return response.status(201).json(product);
    }

    async update(request, response) {
        const { id } = request.params;
        const { description } = request.body;
        const product = await knex('products').where({ id }).limit(1);

        if (product.length === 0)
            return response.status(400).json({ error: 'Product not found!' });

        if (!description)
            return response.status(400).json({ error: 'Product description can\'t be null' });

        await knex('products').update({ description }).where({ id });

        return response.status(204).send();
    }

    async delete(request, response) {
        const { id } = request.params;
        const product = await knex('products').where({ id }).limit(1);

        if (product.length === 0)
            return response.status(400).json({ error: 'Product not found!' });

        await knex('products').del().where({ id });

        return response.status(204).send();
    }
}

export default new ProductController();