import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import catchAsync from '../helpers/catchAsync.js';
import validator from 'validator';
import mongoose from 'mongoose';
export const Logincontroller = catchAsync(
    async (req, res) => {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const result = await bcrypt.compare(password, user.passwordHash);
        if(!result){
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userID: user._id }, "somesecret", { expiresIn: '30d' });
        return res.json({ token });

    }
)

export const Registercontroller = catchAsync(
    async(req, res) => {
        let { username, password, picture } = req.body;
        username = username.trim();
        password = password.trim();

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).json({ error: 'Username must be alphanumeric' });
        }
    
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false })) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 number' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ _id: new mongoose.Types.ObjectId(), username, passwordHash: hashedpassword, profilePicture: picture });
        
        await newUser.save();
        const token = jwt.sign({ userID: newUser._id }, "somesecret", { expiresIn: '30d' });
        return res.json({ token });
    }
)