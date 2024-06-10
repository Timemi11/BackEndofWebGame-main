
// ! ข้อมูลที่ใช้ format ในการแสดงผลไปยัง frontEnd

export default class ProductResponseDto {
    productId?:string;
    pictureUrl?: string;
    userId?: string;
    displayName?: string;
    statusMessage?: string;
    prod_img?:string
    prod_name?: string;
    prod_desc?: string;
    prod_price?: number;
    updated_at?: Date;
}