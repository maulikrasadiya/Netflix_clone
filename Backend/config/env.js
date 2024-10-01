import dotenv from 'dotenv';
dotenv.config();

export const env = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET, 
    NODE_ENV: process.env.NODE_ENV || 'development',
};
