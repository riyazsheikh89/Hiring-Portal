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
                console.log(data.password, " - ", user.password);
                throw {message: 'Oops! incorrect password'};
            }

            const token = user.genJWT();
            return token;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;