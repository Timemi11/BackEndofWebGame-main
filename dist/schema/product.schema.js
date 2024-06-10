"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Schema จะเป็นตัวกำหนดว่าตอน create add ข้อมูล ใน table ใน db จะใช้ pattren นี้ เป็นเหมือนตัว validate ข้อมูล ใน table
exports.productSchema = new mongoose_1.default.Schema({
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
