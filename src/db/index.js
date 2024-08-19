import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectDB = async() =>{
    try {
        let connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log('Database is connected and DB HOST is',connect.connection.host);
        
        
    } catch (error) {
        console.log('The MongoDB connection is failed ',error);
        process.exit(1);
    }
}

export default connectDB;