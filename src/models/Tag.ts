import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { createSlug } from "../utils/slug";

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
    set(val: string) {
      this.setDataValue("name", val);
      this.setDataValue("slug", createSlug(val));
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Tag;
