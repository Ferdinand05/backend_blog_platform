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
});

export default Post;

// Category.addHook("beforeValidate", async (category: any) => {
//   if (!category.changed("name")) return;

//   const baseSlug = createSlug(category.name);
//   let slug = baseSlug;
//   let counter = 1;

//   while (await Category.findOne({ where: { slug } })) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }

//   category.slug = slug;
// });
