// src/server.ts
// This is the module that contains the server class

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth-routes";

export class Server {
    public app: Express;
    private port: number = 8080;

    constructor() {
        this.app = express();
        this.config();
        this.addRoutes();
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
    }

    private addRoutes() {
        this.app.use("/v1/auth", authRoutes);
    }
}
