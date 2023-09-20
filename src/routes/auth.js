import express from 'express';
import { Logincontroller, Registercontroller } from '../controllers/authController.js';

const auth = express.Router();

auth.post('/register', Registercontroller);
auth.post('/login', Logincontroller)

export default auth;