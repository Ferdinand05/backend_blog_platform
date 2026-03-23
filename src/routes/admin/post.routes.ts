import { Router } from "express";
import { createPost, deletePost, getAllPost, updatePost } from "../../controllers/admin/post.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.route("/").get(getAllPost).post(upload.single("cover_image"), createPost);
router.route("/:id").put(upload.single("cover_image"), updatePost).delete(deletePost);

export default router;
