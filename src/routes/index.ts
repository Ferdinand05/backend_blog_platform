import { Router } from "express";

const router = Router();
import authRoutes from "./auth.routes";
import adminRoutes from "./admin/index";
import userRoutes from "./user/index";
import publicRoutes from "./public/index";

// admin routes
router.use("/admin", adminRoutes);

// user routes
router.use("/user", userRoutes);

// auth routes
router.use("/", authRoutes);

// public routes (no auth)
router.use("/", publicRoutes);

export default router;
