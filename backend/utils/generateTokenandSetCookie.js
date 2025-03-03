import jwt from 'jsonwebtoken';
// import { User } from '../models/user.model.js';

export const generateTokenandSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
        expiresIn: '7d',
    });

    // This Code token create
    res.cookie("token", token,{
        httpOnly: true, // XSS
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    return token;
}