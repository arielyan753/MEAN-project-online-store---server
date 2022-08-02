import { Document, model, Schema } from "mongoose";
import regex from "../01-utils/regex";
import CityEnum from "./city-enum";
import { RoleModel } from "./role-model";

// Model interface describing the info in the model:
export interface IUserModel extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: CityEnum;
    street: string;
    role: RoleModel;
}

// Model Schema describing validation
const UserSchema = new Schema<IUserModel>({
    id: {
        type: String,
        required: [true, "Missing id"],
        min: [9, "id too short"],
        max: [9, "id too long"],
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [2, "Name too short"],
        maxlength: [40, "Name too long"],
        match: [regex.nameRegex, "Name must start with a capital letter"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name too short"],
        maxlength: [40, "Last name too long"],
        match: [regex.nameRegex, "Last name must start with a capital letter"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        match: [regex.emailRegex, "Invalid email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [8, "Password too short"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Last name too short"],
        maxlength: [40, "Last name too long"],
        enum: CityEnum
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Last name too short"],
        maxlength: [40, "Last name too long"],
        trim: true
    },
    role: {
        type: String,
    }
})

// Model Class - this is the final model class:
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");