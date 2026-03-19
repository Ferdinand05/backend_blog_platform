import { Router } from "express";
import {
  createUserPost,
  deleteUserPost,
  getUserPosts,
  updateUserPost,
} from "../../controllers/user/post.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.route("/").get(getUserPosts).post(upload.single("cover_image"), createUserPost);
router
  .route("/:id")
  .put(upload.single("cover_image"), updateUserPost)
  .delete(deleteUserPost);

export default router;
