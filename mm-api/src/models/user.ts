// src/models/user.ts
// This is the user model

// Imports
import bcrypt from "bcrypt-nodejs";
import { Document, model, Model, Schema } from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
    generateHash(password: string): string;
    validPassword(password: string): boolean;
}

// Define the schema for the user model
const userSchema: Schema = new Schema({
    facebook: {
        email: String,
        id: String,
        name: String,
        token: String
    },
    google: {
        email: String,
        id: String,
        name: String,
        token: String
    },
    local: {
        email: String,
        password: String
    }
});

// Methods
// Generating a Hash
userSchema.methods.generateHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Check if Password is Valid
userSchema.methods.validPassword = function (password: string) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose to the app
export const User: Model<IUserModel> = model("User", userSchema);
