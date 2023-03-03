class CrudRepository {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {new: true});
            return response;
        } catch (error) {
            console.log('Oops! Something went wrong at CRUD repo');
            throw error;
        }
    }

}

export default CrudRepository;