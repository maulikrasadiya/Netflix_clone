import { user } from "../models/user.model.js"
import becrypt from "bcryptjs";
import { generateTokenAndCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All feild are Requied" })
        }
        if (password < 6) {
            return res.status(400).json({ success: false, message: "at least minimum 6 characters compulsory" })
        }

        const exestingUserByEmail = await user.findOne({ email: email })
        if (exestingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email  already exists" })
        }

        const exestingUserByUsername = await user.findOne({ username: username })
        if (exestingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }

        const salt = await becrypt.genSalt(10)
        const hashpass = await becrypt.hash(password, salt);

        const newUser = new user({
            email,
            password: hashpass,
            username
        })

        generateTokenAndCookie(newUser._id, res);
        await newUser.save();

        
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            },
        });


    } catch (error) {
        console.log("SignUp Errer", error);
        return res.status(500).json({ success: false, message: "Not Found" })
    }
}

export async function login(req, res) {
    res.send("Server successfully logged in");
}

export async function logout(req, res) {
    res.send("Server successfully logged out");
}
