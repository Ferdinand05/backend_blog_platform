import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      max: 150,
      min: 5,
      notEmpty: true,
    },
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 10,
      notEmpty: true,
    },
  },
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["draft", "published"],
    defaultValue: "draft",
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  views: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  cover_image_public_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

export default Post;
