import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      min: 3,
      notEmpty: true,
    },
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Category;
