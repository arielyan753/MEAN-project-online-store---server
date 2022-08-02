import { Document, model, Schema } from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";

// Model interface describing the info in the model:
export interface ICartDetailsModel extends Document {
    productId: Schema.Types.ObjectId;
    amount: number;
    totalPrice: number;
    cartId: Schema.Types.ObjectId;
    name: string;
}

// Model Schema describing validation:
const CartDetailsSchema = new Schema<ICartDetailsModel>({
    productId: {
        type: Schema.Types.ObjectId
    },
    amount: {
        type: Number,
        required: [true, "Missing amount"],
        min: [0, "Amount can't be negative"],
        max: [1000, "Amount can't exceed 1000"],
        trim: true
    },
    totalPrice: {
        type: Number,
        min: [0, "Total price can't be negative"],
        max: [200000, "Total price can't exceed 200,000"],
        trim: true
    },
    cartId: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        trim: true
    }


}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields for carts:
CartDetailsSchema.virtual("carts", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});
// Virtual Fields for products:
CartDetailsSchema.virtual("products", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

// Model Class - this is the final model class:
export const CartDetailsModel = model<ICartDetailsModel>("CartDetailsModel", CartDetailsSchema, "cartDetails");