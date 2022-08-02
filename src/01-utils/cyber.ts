import { IUserModel, UserModel } from "../03-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import jwtDecode from "jwt-decode";


const salt = "MakeThingsGoRight"; // Hash salt.

// Hash password:
function hash(plainText: string): string {

    if (!plainText) return null;

    // Hashing with salt:
    // HMAC = Hashed based Message Authentication Code
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex"); // hex --> convert to string

    return hashedText;
}


const secretKey = "BestProjectEvah";

function getNewToken(user: IUserModel): string {

    // The object we're setting inside the token: 
    const payload = { user };


    // Generate token: 
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    // Return the token
    return token;
}

function verifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

        // If there is no authorization header: 
        if (!authorizationHeader) {
            resolve(false);
            return;
        }

        // Extract the token ("Bearer given-token"): 
        const token = authorizationHeader.split(" ")[1];

        // If there is no token: 
        if (!token) {
            resolve(false);
            return;
        }

        // Here we have a token: 
        jwt.verify(token, secretKey, (err) => {

            // If token expired, if token not legal:
            if (err) {
                resolve(false);
                return;
            }

            // Here the token is legal: 
            resolve(true);
        })

    });

}

function getUserFromToken(authorizationHeader: string): IUserModel {

    // Extract token: 
    const token = authorizationHeader.split(" ")[1];

    // Extract payload from the token: 
    const payload: any = jwt.decode(token);

    // Extract user: 
    const user = payload.user;

    return user;
}

function extractUserId(authorizationHeader: string): string {

    // If there is no authorization header: 
    if (!authorizationHeader) {
        console.log("no header");
        return null;
    }

    // Extract the token ("Bearer given-token"): 
    const token = authorizationHeader.split(" ")[1];

    // If there is no token: 
    if (!token) {
        console.log("no token");
        return null;
    }

    // Here we have a token: 
    const encodedObject: any = jwtDecode(token);
    return encodedObject.user._id;
}



export default { getNewToken, verifyToken, getUserFromToken, hash, extractUserId };