import jwt from "jsonwebtoken";
import { env } from '../config/env.js';

export const generateTokenAndCookie = (userId, res) => {
    // Ensure env.JWT_SECRET is not undefined
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '15d' });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days
        httpOnly: true,
        sameSite: "strict",
        secure: env.NODE_ENV !== "development",  // Use secure cookies in production
    });

    return token;
};
