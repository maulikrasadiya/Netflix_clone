import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://maulikpatel4334:OBo3DfMskLjOJRLP@cluster0.knukv.mongodb.net/netflix_db?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });        
        console.log("Database Connected");
    } catch (err) {
        console.log("Database Connection Error:", err);
      
    }
};
