import mongoose from 'mongoose';
import { ATLAS_URI } from '../config/env-variables.js';

const connect = async () => {
    mongoose.connect(ATLAS_URI);
}

export default connect;