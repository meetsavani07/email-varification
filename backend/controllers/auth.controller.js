import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js"

export const signup = async (req, res) => {
    const{email, password, name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        console.log("user Already exists",userAlreadyExists);
        if(userAlreadyExists) {
            return res.status(400).json({success:false, message: "User already exists"});
        }
        const hashedPassword = await bcryptjs.hash(password, 10); // 123456 => $_123@123
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
       
       
        // generateverificationToken();
        const user = new User({ 
            email, 
            password: hashedPassword, 
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours Work this token
        })

        await user.save();
        
        // jwt
        generateTokenandSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...User._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({success:false, message: error.message})
    }
    // res.send("Signup Route");
};

export const verifyEmail = async (req, res) => {
    // Six digit code -> 1 2 3 4 5 6 
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
    } catch (error) {
        
    }
};

export const login = async (req, res) => {
    res.send("login Route");
};

export const logout = async (req, res) => {
    res.send("logout Route");
};