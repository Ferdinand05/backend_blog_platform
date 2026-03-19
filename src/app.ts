console.log("APP FILE LOADED");
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
import routes from "./routes/index";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorLogger } from "express-winston";

//Initalizing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// logger before routes
app.use(loggerMiddleware);

// routes
app.use("/api", routes);

// logger after routes
app.use(errorLogger);
export default app;
