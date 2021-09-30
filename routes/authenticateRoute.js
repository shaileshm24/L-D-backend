import { userSignup } from '../models/Authenticate/signup';
import { authenticateUserAccount } from '../helpers/contactUser';
import { login } from '../models/Authenticate/login'
import express from 'express';

const router = express.Router();

router.post('/signup',
    userSignup
);

router.post('/login',
    login
);

export default router;