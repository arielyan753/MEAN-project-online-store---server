
import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env
import { UploadedFile } from "express-fileupload";
import fileUpload from "express-fileupload"

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";
dal.connect();
import productController from "./06-controllers/product-controllers";
import categoryController from "./06-controllers/category-controllers";
import userController from "./06-controllers/user-controllers";
import cartController from "./06-controllers/cart-controllers";
import orderController from "./06-controllers/order-controllers";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(fileUpload());
if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use("/api", productController);
server.use("/api", categoryController);
server.use("/api", userController);
server.use("/api", cartController);
server.use("/api", orderController)


server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));


