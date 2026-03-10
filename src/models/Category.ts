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
      len: [3, 50],
      notEmpty: true,
    },
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true,
    },
  },
});

export default Category;
