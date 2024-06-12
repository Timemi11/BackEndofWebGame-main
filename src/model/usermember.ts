import mongoose, { Document } from "mongoose";
import { UserMemberSchema } from "../schema/usermember.schema";

export type Price = {
  formattedPrice: string;
};
export interface WishList {
  name: string;
  appId: number;
  image: string;
  price: Price;
  }

export interface UserMemberModel extends Document {
    userId: string;
    displayName: string;
    formattedPrice: string;
    wishList: WishList[];
}

export default mongoose.model<UserMemberModel>("UserMember", UserMemberSchema);
