import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empType: {
        type: String,
        enum: ['recruiter', 'candidate'],
        required: true
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;