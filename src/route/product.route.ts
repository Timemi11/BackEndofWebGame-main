import { Router } from "express";
import {ProductController} from "../controller/product.controller";


const route = Router()

route.get("/products",  ProductController.getProduct)
route.get("/products/:id",  ProductController.getProductById)
route.post("/products",  ProductController.createProduct)
route.put("/products/:id",  ProductController.updateProductById)
route.delete("/products/:id",  ProductController.deleteProductById)

export default route






