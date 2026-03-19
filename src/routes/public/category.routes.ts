import { Router } from "express";
import { getAllCategory, getDetailCategory, getPostsByCategory } from "../../controllers/public/category.controller";

const router = Router();

router.get("/", getAllCategory);
router.get("/:slug", getDetailCategory);
router.get("/:slug/posts", getPostsByCategory);

export default router;
