import { Router } from "express";
import { getAllUser } from "../../controllers/admin/user.controller";

const router = Router();

router.route("/").get(getAllUser);

export default router;
