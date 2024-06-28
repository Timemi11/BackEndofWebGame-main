"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsFree = void 0;
const checkIsFree = (prod_price, prod_beforeprice) => {
    if (prod_price === 0 || prod_price === null || prod_beforeprice === 0 || prod_beforeprice === null) {
        return { prod_beforeprice: " ", prod_price: "ฟรี" };
    }
    else if (prod_beforeprice === prod_price) {
        return { prod_beforeprice: " ", prod_price: "ราคา " + (prod_price / 100).toFixed(0) + " บาท" };
    }
    else if (prod_beforeprice === "notGet") {
        return { prod_beforeprice: " ", prod_price: "ราคา " + (prod_price / 100).toFixed(0) + " บาท" };
    }
    else {
        return { prod_price: "ลดเหลือ " + (prod_price / 100).toFixed(0) + " บาท", prod_beforeprice: "จาก " + (prod_beforeprice / 100).toFixed(0) + " บาท" };
    }
};
exports.checkIsFree = checkIsFree;
