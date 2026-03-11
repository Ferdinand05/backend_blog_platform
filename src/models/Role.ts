import { DataTypes, REAL } from "sequelize";
import sequelize from "../config/database";
import { createSlug } from "../utils/slug";

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      min: 3,
      notEmpty: true,
    },
    set(value: string) {
      this.setDataValue("role_name", value);
      this.setDataValue("slug", createSlug(value));
    },
  },
});

export default Role;
