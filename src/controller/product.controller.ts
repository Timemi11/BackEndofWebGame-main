import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async getProduct(req: Request, res: Response, next: NextFunction) {
    let product = await ProductService.getProduct();
    const products = product.map((prevData) => {
      return ProductService.mapProductResDto(prevData);
    });
    return res.status(200).json(products);
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    let product = await ProductService.findProductById(req.params.id);
    return res.status(200).json(product);
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    let product = await ProductService.createProduct(req.body);
    return res.status(200).json(product);
  }

  static async updateProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let product = await ProductService.updateProductById(
      req.params.id,
      req.body
    );
    return res.status(200).json(product);
  }

  static async deleteProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let product = await ProductService.deleteProduct(req.params.id, req.body);
    return res.status(200).json(product);
  }
}
