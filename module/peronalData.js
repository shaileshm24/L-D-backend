import mongoose from 'mongoose';

const collectionName = "personalData";

const personalDataSchema = mongoose.Schema({
    personalDataId: {
        type: Schema.Types.ObjectId,
        ref:'user'
     },
},{collection:collectionName});

export const personalData = mongoose.model(collectionName,personalDataSchema);

