// src/server.ts

// Imports
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";

// Passport Setup Imports
import { passportSetup } from "./config/passport-config";

// Route Imports
import { setupAuthRoutes } from "./routes/auth-routes";

// Server Class
export class Server {
    public app: Express;
    private port: number = 8080;

    constructor() {
        this.app = express();
        this.config();
    }

    public run() {
        this.app.listen(this.port, () => {
            console.log("The Musicmeet API is started on port " + this.port);
        });
    }

    private config() {
        // Set Port
        this.port = Number(process.env.PORT) || this.port;

        // Logging
        this.app.use(morgan("dev"));

        // Body Parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        // Cookie Parser
        this.app.use(cookieParser());

        // CORS
        this.app.use(cors({
            credentials: true,
            origin: "http://localhost:3000"
        }));

        // Passport
        this.app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: "musicmeet"
        }));
        passportSetup(passport);
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // Add Routes
        this.addRoutes();
    }

    private addRoutes() {
        const baseUrl: string = "/v1/auth";
        setupAuthRoutes(baseUrl, this.app, passport);
    }
}
