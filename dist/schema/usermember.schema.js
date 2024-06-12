"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMemberSchema = void 0;
const mongoose_1 = require("mongoose");
const PriceSchema = new mongoose_1.Schema({
    formattedPrice: String,
});
exports.UserMemberSchema = new mongoose_1.Schema({
    userId: String,
    displayName: String,
    wishList: [
        {
            name: String,
            appId: Number,
            image: String,
            price: PriceSchema,
        },
    ],
});
