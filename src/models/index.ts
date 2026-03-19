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
  as: "category",
});
Category.hasMany(Post, {
  foreignKey: "category_id",
  as: "posts",
});

// Post <-> User
Post.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});
User.hasMany(Post, {
  foreignKey: "author_id",
  as: "posts",
});

// Post <-> Tag
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
  as: "tags",
});
Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
  as: "posts",
});

// User <-> Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
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
