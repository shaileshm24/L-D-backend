import mongoose, { Schema } from 'mongoose';

const collectionName = "user";

const userSchema = mongoose.Schema({
    userName:{type:String, unique:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    email:{type:String, required:true},
    dob:{type:Date,reuired:true},
    age:{type:Number},
    phone:{type:Number, required:true},
    location:{type:String,required:true},
    isActivated:{type:Boolean,default:false} ,
    userCreatedDate: {type:String}
},{collection:collectionName});

export const user = mongoose.model(collectionName,userSchema);

