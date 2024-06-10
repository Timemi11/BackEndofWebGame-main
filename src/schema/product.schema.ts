import mongoose, { Schema } from "mongoose";

// Schema จะเป็นตัวกำหนดว่าตอน create add ข้อมูล ใน table ใน db จะใช้ pattren นี้ เป็นเหมือนตัว validate ข้อมูล ใน table

export const productSchema: Schema = new mongoose.Schema({
  //Schema of Product
  pictureUrl: String,
  userId: String,
  displayName: String,
  statusMessage: String,
  prod_img: String,
  prod_name: String,
  prod_desc: String,
  prod_price: Number,
  update_at: { type: Date, default: Date.now },
});
