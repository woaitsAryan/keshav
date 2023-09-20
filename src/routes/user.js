import express from 'express';
import { UserController } from '../controllers/userController.js';

const user = express.Router();

user.post('/', UserController);

export default user;