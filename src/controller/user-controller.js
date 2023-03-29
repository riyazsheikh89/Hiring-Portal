import jwt from 'jsonwebtoken';

import UserService from '../services/user-service.js';
import { upload, s3 } from '../config/file-upload-s3-config.js';
import { PASSCODE, JWT_SECRET_KEY, BUCKET_NAME } from '../config/env-variables.js';


const singleUploader = upload.single('resume');

const userService = new UserService();

export const signUp = async (req, res) => {
    try {
        // sign-up for the recruiter
        if (req.body.type === 'recruiter') {
            if (req.body.passcode != PASSCODE) {
                throw ({message: "Invalide Passcode! Please try again."});
            }
        }

        const response = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            empType: req.body.type
        });

        const {name, email, empType} = response;    // Object De-structuring
        return res.status(201).json({
            success: true,
            data: {name, email, empType},
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
        const token = await userService.logIn(req.body);
        // jwt.verify() -> verify the token, and extract the details from it
        var decodedClaims = jwt.verify(token, JWT_SECRET_KEY);
        let isRecruiter = false;
        if (decodedClaims.type === 'recruiter') {
            isRecruiter = true;
        }

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
        if (req.user.empType != 'recruiter') {
            throw ({message: "You are not authorised to access all the users!"});
        }
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
                throw (err);
            }
            let user = await userService.getUserById(req.user.id);
            
            // if the user already has a resume, then delete that one from S3 bucket
            if(user.resume) {
                let str = user.resume;
                let len = str.length;
                const fileName = str.substring(51, len);
                await s3.deleteObject({Bucket: BUCKET_NAME, Key: fileName}).promise();
                console.log("Deleted previous resume!");
            }

            // store the file's link only inside database
            user.resume = req.file.location;
            await user.save();

            return res.status(201).json({
                success: true,
                message: 'Successfully uploaded your resmue',
                data: true,
                err: {}
            });
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with uploadResume, at user-controller layer!',
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
            message: 'successfully fetched the user',
            data: user,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong with getUser, at user-controller layer!',
            data: {},
            err: error
        });
    }
} 