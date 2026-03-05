import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tag = sequelize.define("Tag", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      min: 2,
      notEmpty: true,
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Tag;
