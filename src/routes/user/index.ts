import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import UserRoutes from "./user.routes";
import UserPostRoutes from "./post.routes";
import { getDashboardStats } from "../../controllers/user/user.controller";
const router = Router();

// middleware
router.use(authMiddleware);

router.use("/me", UserRoutes);
router.use("/posts", UserPostRoutes);
router.get("/dashboard/stats", getDashboardStats);
export default router;
