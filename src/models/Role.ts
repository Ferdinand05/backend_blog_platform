import { DataTypes, REAL } from "sequelize";
import sequelize from "../config/database";

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  },
});

export default Role;
