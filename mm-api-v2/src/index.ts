// src/index.ts

// Imports
import mongoose from "mongoose";
import { Server } from "./server";

// Import Config Files
import mongoConfig from "./config/mongo-config.json";

// Connect to MongoDB Database
mongoose.connect(mongoConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Initialize Server and Run
const server: Server = new Server();
server.run();
