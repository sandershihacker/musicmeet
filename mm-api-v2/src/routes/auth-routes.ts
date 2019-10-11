// src/routes/auth-routes.ts
// This module will handle the authentication routes

import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello World!"
    });
});

export default router;
