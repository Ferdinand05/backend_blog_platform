import express from "express";
import cors from "cors";

import routes from "./routes/index";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorLogger } from "express-winston";
//Initalizing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// logger before routes
app.use(loggerMiddleware);
// routes
app.use("/api/", routes);
// logger after routes
app.use(errorLogger);
export default app;
