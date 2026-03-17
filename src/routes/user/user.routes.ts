import { Router } from "express";
import { getMe, updateProfile } from "../../controllers/user/user.controller";

const router = Router();

router.route("/").get(getMe).put(updateProfile);

export default router;
