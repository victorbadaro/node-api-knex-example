import knex from '../database';

class ProductController {
    async index(request, response) {
        return response.json();
    }

    async find(request, response) {
        const { id } = request.params;

        return response.json();
    }

    async create(request, response) {
        const { description, user_id } = request.body;

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { description } = request.body;

        return response.status(204).send();
    }

    async delete(request, response) {
        const { id } = request.params;

        return response.status(204).send();
    }
}

export default new ProductController();