import { Router } from "express";
import { getAllPost, getPost } from "../../controllers/public/post.controller";

const router = Router();

router.route("/").get(getAllPost);
router.get("/:slug", getPost);
export default router;
