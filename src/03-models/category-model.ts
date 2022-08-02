import { Document, model, Schema } from "mongoose";

// Model interface describing the info in the model:
export interface ICategoryModel extends Document {
    categoryName: string;
}

// Model Schema describing validation
const CategorySchema = new Schema<ICategoryModel>({
    categoryName: {
        type: String,
        required: [true, "Missing category"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
});

// Model Class - this is the final model class:
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "category");
