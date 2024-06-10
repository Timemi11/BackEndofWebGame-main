import mongoose, { Document } from "mongoose";
import { productSchema } from "../schema/product.schema";

// ! Schema ไว้ในนี้ก็ได้ ตัว interface type class ด้วยเหมือนกัน


export interface IProduct extends Document {
  pictureUrl: string;
  userId: string;
  displayName: string;
  statusMessage: string;
  prod_img: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  updated_at?: Date;
}

export default mongoose.model<IProduct>("Product", productSchema);
