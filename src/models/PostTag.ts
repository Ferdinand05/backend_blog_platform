import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const PostTag = sequelize.define("PostTag", {
  post_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tag_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default PostTag;
