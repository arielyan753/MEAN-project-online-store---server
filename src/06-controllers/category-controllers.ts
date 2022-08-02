import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/category-logic";

const router = express.Router();

// get all categories
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await logic.getAllCategories()
        response.json(categories)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;