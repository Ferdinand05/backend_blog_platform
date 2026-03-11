import { Router } from "express";
import postPublicRoutes from "./post.routes";
import categoryPublicRoutes from "./category.routes";
const router = Router();

router.use("/posts", postPublicRoutes);
router.use("/categories", categoryPublicRoutes);
export default router;
