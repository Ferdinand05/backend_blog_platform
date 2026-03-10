import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// middleware
router.use(authMiddleware);

export default router;
