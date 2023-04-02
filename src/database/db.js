import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log(`Wait... Connecting to the Database!`);

    mongoose.connect("mongodb+srv://root:rH6jO2TZJ9EF2xAK@cluster0.aag9qzf.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database MongoDB Atlas Working!"))
    .catch((error) => console.log(error));
}

export default connectDatabase;