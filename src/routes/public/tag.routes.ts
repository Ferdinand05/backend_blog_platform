import { Router } from "express";
import { getAllTag, getPostsByTag } from "../../controllers/public/tag.controller";

const router = Router();

router.get("/", getAllTag);

router.get("/:slug/posts", getPostsByTag);
export default router;
