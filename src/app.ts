console.log("APP FILE LOADED");
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
import routes from "./routes/index";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorLogger } from "express-winston";
import cookieParser from "cookie-parser";
//Initalizing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// logger before routes
app.use(loggerMiddleware);

// routes
app.use("/api", routes);

// logger after routes
app.use(errorLogger);
export default app;
