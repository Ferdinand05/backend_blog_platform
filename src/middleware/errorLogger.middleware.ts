import winston from "winston";
import expressWinston from "express-winston";
export const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "warn",
    }),
  ],
  format: winston.format.combine(winston.format.simple(), winston.format.json()),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});
