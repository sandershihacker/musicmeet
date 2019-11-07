// src/routes/auth-routes.ts
// This module will handle the authentication routes

// Imports
import { NextFunction } from "connect";
import express, { Express, Request, Response, Router } from "express";
import { PassportStatic } from "passport";

// Function to set up authentication routes
export const setupAuthRoutes = (baseUrl: string, app: Express, passport: PassportStatic) => {
    const router: Router = express.Router();

    // Function to determine logged in state, used for authorized routes
    const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            console.log("Logged in.");
            return next();
        }
        console.log("Not logged in.");
    };

    // API main entry point
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            message: "Welcome to the authentication endpoint of the Musicmeet API!"
        });
    });

    // Endpoint for signing up
    router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local-signup", (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(200).send({ message: "User already exists!" });
            }
            return res.status(200).send({ message: "Sign-up successful!" });
        })(req, res, next);
    });

    // Endpoint for logging in
    router.post("/login", (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local-login", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({ message: "Authentication failsed." });
            }
            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.send(req.user);
            });
        })(req, res, next);
    });

    // Route to log current user out
    router.get("/logout", (req: Request, res: Response) => {
        req.logout();
        res.clearCookie("connect");
        res.clearCookie("connect.sid");
        console.log("Logged user out.");
        return res.redirect("/");
    });

    // Protected endpoint for getting a user profile
    router.get("/profile", isLoggedIn, (req: Request, res: Response) => {
        res.status(200).send(req.user);
    });

    // Add routes to authentication base url of app
    app.use(baseUrl, router);
};
