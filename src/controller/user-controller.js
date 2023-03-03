import UserService from '../services/user-service.js';

const userService = new UserService();

export const signUp = async (req, res) => {
    try {
        const response = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            empType: req.body.type
        });
        return res.status(201).json({
            success: true,
            data: response,
            message: "Successfully signed up",
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong with signUp, at user-controller!',
            err: error
        });
    }
}