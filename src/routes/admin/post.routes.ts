import { Router } from "express";
import { getAllPost } from "../../controllers/admin/post.controller";

const router = Router();
router.route("/").get(getAllPost);

export default router;
