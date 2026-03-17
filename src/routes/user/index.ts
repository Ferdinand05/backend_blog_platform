import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import UserRoutes from "./user.routes";
import UserPostRoutes from "./post.routes";
const router = Router();

// middleware
router.use(authMiddleware);

router.use("/me", UserRoutes);
router.use("/posts", UserPostRoutes);
export default router;
