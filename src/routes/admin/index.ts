import { Router } from "express";

const router = Router();
import userAdminRoutes from "./user.routes";
import roleAdminRoutes from "./role.routes";
import categoryAdminRoutes from "./category.routes";
import postAdminRoutes from "./post.routes";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";
import tagAdminRoutes from "./tag.routes";
// middleware
router.use(authMiddleware, adminMiddleware);

router.use("/users", userAdminRoutes);
router.use("/roles", roleAdminRoutes);
router.use("/categories", categoryAdminRoutes);
router.use("/posts", postAdminRoutes);
router.use("/tags", tagAdminRoutes);
export default router;
