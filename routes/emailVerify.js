import { userSignup } from '../models/Authenticate/signup';
import { authenticateUserAccount } from '../helpers/contactUser';
import { login } from '../models/Authenticate/login'
import express from 'express';

const router = express.Router();

export const emailVerify = router.get('/verify-email/:token', [async function(req,res) {
    try{
        const token = req.params.token;
        console.log("token auth",token);
        const activated = await authenticateUserAccount(token);
        return res.status(200).redirect("https://google.com/");
    }catch(error){
        console.log("error",error);
    }
    }]);

