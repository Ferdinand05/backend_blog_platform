import { Router } from "express";
import { getAllPost } from "../../controllers/public/post.controller";

const router = Router();

router.route("/").get(getAllPost);

export default router;
