"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    static getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield product_service_1.ProductService.getProduct();
            const products = product.map((prevData) => {
                return product_service_1.ProductService.mapProductResDto(prevData);
            });
            return res.status(200).json(products);
        });
    }
    static getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield product_service_1.ProductService.findProductById(req.params.id);
            return res.status(200).json(product);
        });
    }
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield product_service_1.ProductService.createProduct(req.body);
            return res.status(200).json(product);
        });
    }
    static updateProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield product_service_1.ProductService.updateProductById(req.params.id, req.body);
            return res.status(200).json(product);
        });
    }
    static deleteProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield product_service_1.ProductService.deleteProduct(req.params.id, req.body);
            return res.status(200).json(product);
        });
    }
}
exports.ProductController = ProductController;
