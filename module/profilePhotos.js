import mongoose, { Schema } from 'mongoose';

const collectionName = "profilePhoto";

const profilePhotoSchema = mongoose.Schema({
   profileId: {
      type: Schema.Types.ObjectId,
      ref:'user'
   },
   profileImage:{type:String},
   images:[{type:String}]
},{collection:collectionName});

export const profilePhoto = mongoose.model(collectionName,profilePhotoSchema);