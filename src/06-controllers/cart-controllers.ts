import express, { NextFunction, Request, Response } from "express";
import { CartDetailsModel } from "../03-models/cart-details-model";
import cartLogic from "../05-logic/cart-logic";

const router = express.Router();

// Get cart by user id:
router.get("/cart/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const cart = await cartLogic.createCartOrGet(userId);
        response.json(cart);
    } catch (err: any) {
        next(err);
    }
});

// Add cart product:
router.post("/cart/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartProduct = new CartDetailsModel(request.body);
        cartProduct.totalPrice = await cartLogic.calcTotalPrice(request.body.productId, cartProduct.amount);
        const newCartProduct = await cartLogic.addProductToCart(cartProduct);
        response.json(newCartProduct);
    } catch (err: any) {
        next(err);
    }
});

// Get cart-products by cart-id:
router.get("/cart/products/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        const cartProducts = await cartLogic.getCartDetails(cartId);
        response.json(cartProducts);
    } catch (err: any) {
        next(err);
    }
});

// Delete cart product:
router.delete("/cart/products/:cartId/:productId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        const productId = request.params.productId;
        await cartLogic.deleteProductFromCart(cartId, productId);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

// Delete all cart products:
router.delete("/cart/products/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId;
        await cartLogic.deleteAllCartProducts(cartId);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

// Update cart product:
router.put("/cart-product/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const newCart = new CartDetailsModel(request.body);
        newCart.totalPrice = await cartLogic.calcTotalPrice(request.body.productId, newCart.amount);
        const updatedCartProduct = await cartLogic.updatedCartProduct(newCart);
        response.json(updatedCartProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// get cart for a specific user
router.get("/cart/perUser/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const carts = await cartLogic.getCartPerUser(userId);
        response.json(carts);
    } catch (err: any) {
        next(err);
    }
});


export default router;