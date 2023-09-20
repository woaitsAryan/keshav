import catchAsync from "../helpers/catchAsync.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
export const UserController = catchAsync(
    async (req, res) => {
        const {token} = req.body;

        const decodedToken = jwt.verify(token, "somesecret");
        const userID = decodedToken.userID;
        const existingUser = await User.findOne({ _id: userID });
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }
        return res.status(200).json({ username: existingUser.username, profilePicture: existingUser.profilePicture });

    }
)