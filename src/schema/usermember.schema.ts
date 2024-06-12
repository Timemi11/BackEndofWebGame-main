import mongoose, { Schema } from "mongoose";

const PriceSchema: Schema = new Schema({
    formattedPrice: String
  });
  export const UserMemberSchema: Schema = new Schema({
    userId: String,
    displayName: String,
    wishList: [{
      name: String,
      gameId: Number,
      image: String,
      price: PriceSchema
    }]
  });
