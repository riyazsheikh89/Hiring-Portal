import mongoose from 'mongoose';

const connect = async () => {
    mongoose.connect('mongodb+srv://riyaz-atlas:mD7XpJdKm8Ch0q0K@atlas-cluster.6xi3y9g.mongodb.net/Hiring-Portal');
}

export default connect;