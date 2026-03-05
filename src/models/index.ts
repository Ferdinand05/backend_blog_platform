import sequelize from "../config/database";
import Category from "./Category";
import Post from "./Post";
import PostTag from "./PostTag";
import Role from "./Role";
import Tag from "./Tag";
import User from "./User";

// relations

// Post <-> Category
Post.belongsTo(Category, {
  foreignKey: "category_id",
});
Category.hasMany(Post, {
  foreignKey: "category_id",
});

// Post <-> User
Post.belongsTo(User, {
  foreignKey: "author_id",
});
User.hasMany(Post, {
  foreignKey: "author_id",
});

// Post <-> Tag
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
});
Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
});

// User <-> Role
User.belongsTo(Role, {
  foreignKey: "role_id",
});
Role.hasMany(User, {
  foreignKey: "role_id",
});

// register model
const db = {
  sequelize,
  Role,
  User,
  Category,
  Post,
  Tag,
  PostTag,
};

export default db;
