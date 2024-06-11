import mongoose, { Document } from "mongoose";
import { UserMemberSchema } from "../schema/usermember.schema";
export interface WishList {
    gameId: number;
  }

export interface UserMemberModel extends Document {
    userId: string;
    displayName: string;
    wishList: WishList[];
}

export default mongoose.model<UserMemberModel>("UserMember", UserMemberSchema);
