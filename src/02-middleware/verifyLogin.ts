import { NextFunction, Request, Response } from "express";
import ErrorModel from "../03-models/error-model";
import cyber from "../01-utils/cyber";



async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {

    // middleware to verify if the user is logged in
    const authorizationHeader = request.header("authorization"); 

    const isValid = await cyber.verifyToken(authorizationHeader);

    if (!isValid) {
        next(new ErrorModel(401, "You are not logged in"));
        return;
    }

    next();
}

export default verifyLoggedIn