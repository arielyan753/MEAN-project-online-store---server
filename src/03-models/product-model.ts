import { UploadedFile } from "express-fileupload";
import { Document, model, Schema } from "mongoose";
import regex from "../01-utils/regex";
import { CategoryModel } from "./category-model";

// Model interface describing the info in the model:
export interface IProductModel extends Document {
    name: string;
    price: number;
    imageName: string;
    categoryId: Schema.Types.ObjectId;
    image: UploadedFile;
}

// Model Schema describing validation
const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        match: [regex.nameRegex, "Name must start with a capital letter"],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    imageName: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId
    },
    image: {
        type: Object
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields category:
ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

// Model Class - this is the final model class:
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");
