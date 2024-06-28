export const checkIsFree = (prod_price: any, prod_beforeprice: any) => {
    if (
        prod_price === 0 ||
        prod_price === null ||
        prod_beforeprice === 0 ||
        prod_beforeprice === null
    ) {
        prod_beforeprice = " ";
        prod_price = "ฟรี";
    } else if (prod_beforeprice === prod_price) {
        prod_beforeprice = " ";
        prod_price = "ราคา " + (prod_price / 100).toFixed(0) + " บาท";
    } else if (prod_beforeprice === "notGet") {
        prod_beforeprice = " ";
        prod_price = "ราคา " + (prod_price / 100).toFixed(0) + " บาท";
    } else {
        prod_price = "ลดเหลือ " + (prod_price / 100).toFixed(0) + " บาท";
        prod_beforeprice = "จาก " + (prod_beforeprice / 100).toFixed(0) + " บาท";
    }
}