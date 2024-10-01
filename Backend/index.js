import express from 'express';
import dotenv from 'dotenv';
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

});
