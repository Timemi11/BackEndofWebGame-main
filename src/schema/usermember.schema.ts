import mongoose, { Schema } from "mongoose";

export const UserMemberSchema: Schema = new mongoose.Schema({
    userId:String,
    displayName:String,
    wishList:[{gameId:Number}]
});
