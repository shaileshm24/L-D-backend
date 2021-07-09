import {user} from '../module/userSignup';
import {profilePhoto} from '../module/profilePhotos';
import { userSignup } from '../Authenticate/signup';
import  mongoose  from "mongoose";
import jwt from 'jsonwebtoken';

export const editPersonalInfo = async(req,res,next) => {
    try{
        const userEmail = jwt.verify(req.headers.authorization.split(' ')[1],process.env.ACTIVATE_KEY);
        const isUserInDB = await user.findOne({email:userEmail.data.email});
      
        // let matchObj = {}
        // matchObj['profileId'] = mongoose.Types.ObjectId(isUserInDB._id);
        if(isUserInDB){
            const userProfilePhoto = await profilePhoto.findOne({profileId:isUserInDB._id});
            console.log(userProfilePhoto);
        }
    }catch(error){
        console.log(error);
    }
}