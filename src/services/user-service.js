import UserRepository from "../repository/user-repository.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async logIn(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw {message: 'No user found with this email-id!'};
            }
            
            if(!user.comparePassword(data.password)) {
                throw {message: 'Oops! incorrect password'};
            }

            // if the user is found with the given email, then generate a token for the user
            const token = user.genJWT();
            return token;
        } catch (error) {
            throw error;
        }
    }

    async getUserByType(data) {
        try {
            const users = await this.userRepository.getAll(data);
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(data) {
        try {
            const user = await this.userRepository.findBy(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserService;