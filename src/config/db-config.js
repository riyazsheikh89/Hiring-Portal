import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
    mongoose.connect(process.env.ATLAS_URI);
}

export default connect;