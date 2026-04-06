import { Router } from "express";
import { getAdminDashboardStats } from "../../controllers/admin/dashboard.controller";

const router = Router();

router.get("/stats", getAdminDashboardStats);

export default router;
