import UserService from '../services/user-service.js';
import { upload, s3 } from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('resume');

const userService = new UserService();

export const signUp = async (req, res) => {
    try {
        // sign-up for the recruiter
        if (req.body.type === 'recruiter') {
            if (req.body.passcode === process.env.PASSCODE) {
                console.log('Valid Passcode');
            } else {
                throw ({message: "Invalide Passcode! Please try again."});
            }
        }

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
            message: "Something went wrong with signUp, at user-controller!",
            err: error
        });
    }
}


export const login = async (req, res) => {
    try {
        let isRecruiter = false;
        if (req.body.type == 'recruiter') {
            isRecruiter = true;
        }
        const token = await userService.logIn(req.body);

        return res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            isRecruiter: isRecruiter,
            data: token,
            err: {}
        });
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
        const user = await userService.getUserById(req.params.id);

        singleUploader(req, res, async (err) => {
            if (err) {
                throw (err);
            }
            // if the user already has a resume, then delete that one and upload the latest one
            if(user.resume) {
                let str = user.resume;
                let len = str.length;
                const fileName = str.substring(55, len);
                await s3.deleteObject({Bucket: process.env.BUCKET_NAME, Key: fileName}).promise();
                console.log("Deleted previous resume!");
            }

            user.resume = req.file.location;
            await user.save();
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully uploaded your resmue',
            data: user,
            err: {}
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