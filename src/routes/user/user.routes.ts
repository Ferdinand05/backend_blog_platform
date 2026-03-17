import { Router } from "express";
import {
  changePassword,
  getMe,
  updateProfile,
} from "../../controllers/user/user.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.route("/").get(getMe).put(upload.single("avatar"), updateProfile);
router.put("/password", changePassword);

export default router;
