import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../03-models/product-model";
import logic from "../05-logic/product-logic";
import path from 'path';
import verifyIfAdmin from "../02-middleware/checkIfAdmin";

const router = express.Router();

// get all products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProducts()
        response.json(products)
    }
    catch (err: any) {
        next(err);
    }
});

// route for images from assets
router.get('/products/images/:imageName', async (request, response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", imageName);
        response.sendFile(absolutePath);

    }
    catch (err: any) {
        next(err);
    }

});

// get products by category
router.get("/products-by-category/:categoryId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId
        const products = await logic.getProductsByCategory(categoryId)
        response.json(products)
    }
    catch (err: any) {
        next(err);
    }
});

// get one product
router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        const product = await logic.getOneProduct(_id)
        response.json(product)
    }
    catch (err: any) {
        next(err);
    }
});

// add product
router.post("/products", verifyIfAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body)
        const addedProduct = await logic.addProduct(product)
        response.status(201).json(addedProduct)
        
    }
    catch (err: any) {
        next(err);
    }
});

// update product
router.put("/products/:_id", verifyIfAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        request.body._id = request.params._id
        const product = new ProductModel(request.body)
        const updatedProduct = await logic.updateProduct(product)
        response.json(updatedProduct)
    }
    catch (err: any) {
        next(err);
    }
});

/*please don't count this still working on it. not for the project for myself*/
// delete product
router.delete("/products/:_id", verifyIfAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await logic.deleteProduct(_id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});
/*please don't count this still working on it. not for the project for myself*/



export default router;