import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findById(data) {
        try {
            const response = await User.findById(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;