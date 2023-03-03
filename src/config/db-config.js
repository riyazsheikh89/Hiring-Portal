import mongoose from 'mongoose';

const connect = async () => {
    mongoose.connect('mongodb://localhost/Hiring-Portal');
}

export default connect;