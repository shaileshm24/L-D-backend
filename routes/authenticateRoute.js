import { userSignup } from '../Authenticate/signup';
import { authenticateUserAccount } from '../helpers/contactUser';
import { login } from '../Authenticate/login'
import express from 'express';

const router = express.Router();

router.post('/signup',
    userSignup
);

router.post('/login',
    login
);

export default router;