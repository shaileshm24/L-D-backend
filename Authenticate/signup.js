// import { jwt } from "jsonwebtoken";
import { user } from '../module/userSignup';
// import {profilePhoto} from '../module/profilePhotos'
import bcrypt from 'bcrypt';
import {sendActivationMail,sendSMS} from '../helpers/contactUser';
import moment from 'moment';

function getAge(birth) {
 
    const age = 23;
     
    return age;   
   
 
}
export const userSignup = async (req, res) => {
    try {

        const signupData = req.body;
        let saveUserData, data;
        console.log("signupData",signupData);
        const salt = 10;
        const userData = await user.find({ "email": signupData.user.email });
        // console.log("User Data", userData)
        if (userData.length == 0) {
            bcrypt.hash(signupData.user.password, salt, async function (error, hash) {

                if (!error) {
                    signupData.user.userCreatedDate = moment();
                    signupData.user.password = hash
                    signupData.user.userName = `${signupData.user.firstName[0]}${signupData.user.lastName[0]}${Math.floor(Math.random()*9000)+100000}`;
                    signupData.user.email.toLowerCase();
                    signupData.user.dob = moment(signupData.user.dob,"DD/MM/YYYY").add(1, 'day')
                    signupData.user.age = moment().diff(moment(signupData.user.dob,"DD/MM/YYYY"),'years');
                    console.log("age",signupData.user.age);
                    saveUserData = await user.create(signupData.user);
                    console.log(saveUserData);
                    // if(saveUserData){
                    //     const options = { authorization: process.env.SMS_API_KEY, message:`\nDear ${signupData.user.firstName}\nThank you registering at Suyog Vivah. Please verify your email id to connect with all profiles. To verify the email, link has been sent to your email address.\n${signupData.user.email}`, numbers: [signupData.user.phone] }
                    //     // sendSMS (options);
                    //     await sendActivationMail(signupData);
                        return res.status(200).send({ msg: "User created successfully" });
                    // }
                    
                }
                else {
                    console.log("error",error);
                }
            });
            
        }
        else {
            throw error;
        }
    }
    catch (error) {
        return res.status(500).send({ msg: "User Already Exist" });
    }
}

