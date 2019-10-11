// src/index.ts

// Imports
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { Server } from "./server";

// Initialize Server and Run
const server: Server = new Server();
server.run();
