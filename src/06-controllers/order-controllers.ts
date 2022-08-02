import express, { NextFunction, Request, Response } from "express";
import ErrorModel from "../03-models/error-model";
import { OrderModel } from "../03-models/order-model";
import logic from "../05-logic/order-logic";
import path from 'path';


const router = express.Router();

// get all orders
router.get("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await logic.getAllOrders()
        response.json(orders)
    }
    catch (err: any) {
        next(err);
    }
});

// create new order
router.post("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body)
        const addedOrder = await logic.createOrder(order)
        response.json(addedOrder)
    }
    catch (err: any) {
        next(err);
    }
});

//get the last order of a user
router.get('/orders/last/:userId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const order = await logic.lastOrder(userId);
        response.json(order)
    }
    catch (err: any) {
        next(err);
    }
});

//get file receipt for user
router.get('/orders/:cartId', async (request, response, next: NextFunction) => {
    try {
        const fileName = request.params.cartId;
        const absolutePath = path.join(__dirname, "..", "..", "src", "assets", "receipts", fileName + '.txt');
        response.sendFile(absolutePath);

    }
    catch (err: any) {
        next(err);
    }




});

export default router;

