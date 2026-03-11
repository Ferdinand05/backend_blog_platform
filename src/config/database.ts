import { Sequelize } from "sequelize";
import fs from "fs";
const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, "", {
  host: process.env.DB_HOST as string,
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT as string, 10),
  logging: (msg) => {
    fs.appendFileSync("logs/app.log", msg + "\n");
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
