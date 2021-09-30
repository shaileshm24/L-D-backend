import {user} from '../../module/userSignup';
import {profilePhoto, profilephoto} from '../../module/profilePhotos';
import { userSignup } from '../Authenticate/signup';
import  mongoose  from "mongoose";

export const viewPersonalProfile = async(req,res,next) =>{
    try{
            const userId = req.params.id;
            let matchObj = {}
            if(userId){
               matchObj['profileId'] = mongoose.Types.ObjectId(userId);
            }
           const profileInfo = await profilePhoto.aggregate([
                    {
                        $lookup:{
                            from:'user',
                            localField:'profileId',
                            foreignField:'_id',
                            as: 'profile'
                        }
                    },
                    {
                        $match:{...matchObj}
                    },
                    {$unwind:'$profile'},
                    {
                        $project:{
                            images: 1,
                            'userName':'$profile.userName',
                            'firstName': '$profile.firstName',
                            'lastName':'$profile.lastName',
                            'gender':'$profile.gender',
                            'email':'$profile.email',
                            'phone':'$profile.phone',
                            'location':'$profile.location',

                        }
                    }
            ]);
            console.log(profileInfo);
            return res.status(200).send(profileInfo);
    }catch(error){
        console.log(error);
    }
}