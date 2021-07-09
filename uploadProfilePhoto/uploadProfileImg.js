import AWS, { RedshiftData } from 'aws-sdk';
import multer from 'multer';
import { profilePhoto } from '../module/profilePhotos';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET
});

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
});

export const upload = multer({ storage }).single('image');

export const uploadProfileImage = async (req, res, next) => {
    try {
        const params = {
            Key: req.file.originalname,
            Bucket: process.env.AWS_BUCKET,
            Body: req.file.buffer
        }
        s3.upload(params, async function (err, data) {
            if (err) {
                res.json({ "error": true, "Message": err });
            } else {
                const photoExist = await profilePhoto.findOne({profileId:req.params.id});
                if(photoExist){
                await updateProfilePhotoToDb(req.params.id,data.Location)
                }else{
                    await uploadProfileImageToDb(req.params.id,data.Location)
                }
                res.json({ "error": false, "Message": "File Uploaded SuceesFully", Data: data });
            }
        });

    } catch (error) {
        console.log(error);
    }

}

const uploadProfileImageToDb = async (id, data) => {
    try {
        console.log("called upload photo", id, data);
        const dbRes = await profilePhoto.create({ profileId: id , profileImage: data });
        console.log(dbRes);
        return dbRes;
    } catch (error) {
        console.log(error);
    }
}


const updateProfilePhotoToDb = async (id, data) => {
    try {
        console.log("called update photo", id, data);
        const dbRes = await profilePhoto.findOneAndUpdate({ profileId: id }, { profileImage: data },function(error,response){
            if(error){
               return error
            }
           return response
        });
       
    } catch (error) {
        console.log(error);
    }
}

export const deleteProfilePhotoFromDB =async (req,res,next) => {
    try{
        const userId = req.params.id;
        //const imgPath = req.body.img;
        const delPhoto = await profilePhoto.findOneAndUpdate({profileId:userId},{profileImage:null},function(error,response){
            if(error){
                res.send(error)
            }
            res.send(response)
        })
       
    }catch(error){
        console.log(error);
    }
}