import mongoose from "mongoose";

const connectDB = async () =>{

    mongoose.connection.on('connected', () =>{
        console.log("Successfully connected to the database ");
    })

    // establish connection to db
    await mongoose.connect(`${process.env.MONGODB_URI}/pharmacy`);
}

export default connectDB;