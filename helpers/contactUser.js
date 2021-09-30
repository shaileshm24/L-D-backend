import mail from './sendMail';
import { user } from '../module/userSignup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSignup } from '../models/Authenticate/signup';
import unirest from "unirest";

const req = unirest("GET", "https://www.fast2sms.com/dev/bulk");



export const sendActivationMail = async (signupData) => {
    try {
        await mail('activateUser', signupData.user, async function (err, activate) {
            if (err) {
                return res.status(401).send({ error: "User is not activated" });
            }
            console.log("Activate obj", activate)
        });

    } catch (error) {
        console.log("error", error);
    }
}

export const authenticateUserAccount = async (token) => {
    try {
        const verifiedToken = jwt.verify(token, process.env.ACTIVATE_KEY, { expiresIn: '1d' });
        console.log("verify token", verifiedToken);
        await user.findOneAndUpdate({ email: verifiedToken.email }, { isActivated: true }, async function (err, success) {
            if (err) {
                return res.status(401).send({ error: "User is not activated" });
            }
            sendWelcomeMailAndSMS(verifiedToken.email);
            return res.status(200).send({ msg: "User account activated." })
        });

    } catch (err) {
        console.log("err", err);
    }
}


export const sendWelcomeMailAndSMS = async (email) => {
    try {
        const checkActivatedUser = await user.findOne({ email: email });
        if (checkActivatedUser.isActivated === true) {
            mail('userSignup', checkActivatedUser);
        }


    } catch (err) {
        console.log("err", err);
    }
}

export const sendSMS = (data) => {
    try {
        console.log("data", data);
        req.query({
            "authorization": data.authorization,
            "sender_id": "FSTSMS",
            "message": data.message,
            "language": "english",
            "route": "p",
            "numbers": data.numbers[0],
            "flash":0
        });

        req.headers({
            "cache-control": "no-cache"
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            console.log("msg body",res.body);
        });
        return "Message sent"
    }
    catch (err) {
        console.log("err", err);
    }
}