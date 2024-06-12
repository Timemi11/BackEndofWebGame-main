import mongoose, { Schema } from "mongoose";

const PriceSchema: Schema = new Schema({
    formattedPrice: String
  });
  export const UserMemberSchema: Schema = new Schema({
    userId: String,
    displayName: String,
    wishList: [{
      name: String,
      appId: Number,
      image: String,
      price: PriceSchema
    }]
  });
