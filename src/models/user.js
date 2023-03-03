import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    empType: {
        type: String,
        enum: ['recruiter', 'candidate'],
        required: true
    },
    resume: {
        type: String
    }

}, {timestamps: true});

// converts the plain password to the hash passwords and saves it
userSchema.pre('save', function(next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});


// compares the plain text password with the bcrypt encrypted password
userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}


// this method generates unique json web token for user authentication
userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, 'digibox_key', {expiresIn: '1D'});
}

const User = mongoose.model('User', userSchema);

export default User;