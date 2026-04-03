import { Router } from "express";
import { createUserPost, deleteUserPost, getUserPosts, updateStatusPost, updateUserPost } from "../../controllers/user/post.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.route("/").get(getUserPosts).post(upload.single("cover_image"), createUserPost);
router.route("/:id").put(upload.single("cover_image"), updateUserPost).delete(deleteUserPost);

router.put("/update/status/:id", updateStatusPost);

export default router;
