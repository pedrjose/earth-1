import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log(`Wait... Connecting to the Database!`);

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database MongoDB Atlas Working!"))
        .catch((error) => console.log(error));
}

export default connectDatabase;