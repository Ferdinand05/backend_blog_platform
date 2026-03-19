import { Router } from "express";
import postPublicRoutes from "./post.routes";
import categoryPublicRoutes from "./category.routes";
import tagPublicRoutes from "./tag.routes";
const router = Router();

router.use("/posts", postPublicRoutes);
router.use("/categories", categoryPublicRoutes);
router.use("/tags", tagPublicRoutes);
export default router;
