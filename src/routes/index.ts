import { Router } from "express";

const router = Router();
import authRoutes from "./auth.routes";
import adminRoutes from "./admin/index";

// admin routes
router.use("/admin", adminRoutes);

// auth routes
router.use("/", authRoutes);

export default router;
