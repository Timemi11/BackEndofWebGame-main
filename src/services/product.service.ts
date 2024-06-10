import ProductModel from "../model/product";

import ProductResponseDto from "../dto/product.dto";

// Services

export class ProductService {
  static async getProduct() {
    const product = await ProductModel.find({});
    return product;
  }

  static async findProductById(id: string) {
    const product = await ProductModel.findById(id);
    return product;
  }

  static async createProduct(newProduct: any) {
    const product = await ProductModel.create(newProduct);
    return product;
  }
  static async updateProductById(id: string, newProduct: any) {
    const product = await ProductModel.findByIdAndUpdate(id, newProduct);
    return product;
  }
  static async deleteProduct(id: string, newProduct: any) {
    const product = await ProductModel.findByIdAndDelete(id, newProduct);
    return product;
  }

  static mapProductResDto(model: any): ProductResponseDto {
    return {
      productId: model._id,
      pictureUrl: model.pictureUrl,
      userId: model.userId,
      displayName: model.displayName,
      statusMessage: model.statusMessage,
      prod_img: model.prod_img,
      prod_name: model.prod_name,
      prod_desc: model.prod_desc,
      prod_price: model.prod_price,
      updated_at: model.update_at,
    };
  }
}
