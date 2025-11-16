// filepath: e:\ProductApp\routes\authRoutes.js

import isAuthenticated from '../middleware/authmiddleware.js';
import express from 'express';
const router = express.Router();
import User from "../models/usermodel.js"

import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password ,role} = req.body;

        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            role
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role:user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/getcurrentuser",isAuthenticated,async(req,res)=>{
    try{
        const user= await User.findById(req.user_id).select("-password")
        if(!user)
        {
            return res.status(400).json({message:"cannot get currentuser"})

        }
        res.status(200).json(user)
    }
    catch(error)
    {
         res.status(500).json({error:error.message})
         console.log("catcherror in getcurrentuser")
    }

            
})
export default router