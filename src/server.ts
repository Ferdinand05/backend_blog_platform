import * as dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
import db from "./models";
import app from "./app";

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(process.env.PORT, () => {
      console.log(`App Listen to port ${process.env.PORT}`);
    });

    // await sequelize.sync({ force: true });

    // console.log("All models were synchronized successfully.");

    // console.log("📊 Tables created:", Object.keys(db.sequelize.models));

    // console.log("Database : " + db.sequelize.getDatabaseName());
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connect();
