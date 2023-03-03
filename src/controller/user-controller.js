import UserService from '../services/user-service.js';
import upload from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('pdf');

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
            message: `Something went wrong with signUp, at user-controller!: ${error.message}`,
            err: error
        });
    }
}


export const login = async (req, res) => {
    try {
        let isRecruiter = false;
        if (req.body.type == 'recruiter') {
            isRecruiter = true;
            const token = await userService.logIn(req.body);
        }
        const token = await userService.logIn(req.body);
        return res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            isRecruiter: isRecruiter,
            data: token,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with login, at user-controller layer!',
            data: {},
            err: error
        });
    }
}


export const getAllUser = async (req, res) => {
    try {
        const users = await userService.getUserByType(req.body);
        return res.status(200).json({
            success: true,
            message: 'successfully fetched all users',
            data: users,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with getting all, at user-controller layer!',
            data: {},
            err: error
        });
    }
}


export const uploadResume = async (req, res) => {
    try {
        singleUploader(req, res, async function(err, data) {
            if (err) {
                return res.status(500).json({error: err});
            }

            if(req.file === undefined) { // if there is no pdf file
                
                return res.status(201).json({
                    message: 'Please select a file'
                });
            } else {
                const user = await userService.getUserById(req.body.id);
                console.log(user);
                user.resume = req.file.location;
                await user.save();
                return res.status(201).json({
                    success: true,
                    message: 'Successfully uploaded your resmue',
                    data: user,
                    err: {}
                });
            }

        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with getting all, at user-controller layer!',
            data: {},
            err: error
        });
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.body.id);
        return res.status(200).json({
            success: true,
            message: 'successfully fetched the users',
            data: user,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with getting all, at user-controller layer!',
            data: {},
            err: error
        });
    }
} 