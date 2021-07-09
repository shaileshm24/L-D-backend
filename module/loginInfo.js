import mongoose, { Schema } from 'mongoose';

const collectionName = "logininfo";

const loginInfoSchema = mongoose.Schema({
    email:String,
    dateOfLogin:String,
    device:String,
    location: String
},{collection:collectionName});

export const LoginInfo = mongoose.model(collectionName,loginInfoSchema);

