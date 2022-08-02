import { Document, model, Schema } from "mongoose";
import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";
import CityEnum from "./city-enum";

// Model interface describing the info in the model:
export interface IOrderModel extends Document {
    userId: Schema.Types.ObjectId;
    cartId: Schema.Types.ObjectId;
    totalPrice: number;
    city: CityEnum;
    street: string;
    shippingDate: Date;
    orderDate: Date;
    fourDigits: string;
}

// Model Schema describing validation
const OrderSchema = new Schema<IOrderModel>({
    userId: {
        type: Schema.Types.ObjectId
    },
    cartId: {
        type: Schema.Types.ObjectId
    },
    totalPrice: {
        type: Number
    },
    city: {
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "City name too short"],
        maxlength: [100, "City name too long"],
        enum: CityEnum
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street name too short"],
        maxlength: [100, "Street name too long"]
    },
    shippingDate: {
        type: Date,
        required: [true, "Missing shipping date"]
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    fourDigits: {
        type: String,
        required: [true, "Missing last four digits"],
        minlength: [4, "Last digits can't be less then 4 digits"],
        maxlength: [4, "Last digits can't be more then 4 digits"]
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields users:
OrderSchema.virtual("users", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

// Virtual Fields carts:
OrderSchema.virtual("carts", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

// Model Class - this is the final model class:
export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "orders");