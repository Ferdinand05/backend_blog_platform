import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { createSlug } from "../utils/slug";

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
    set(value: string) {
      this.setDataValue("name", value);
      this.setDataValue("slug", createSlug(value));
    },
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 100],
      notEmpty: true,
    },
  },
});

export default Category;
