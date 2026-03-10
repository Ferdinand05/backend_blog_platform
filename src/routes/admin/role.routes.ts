import { Router } from "express";
import { getAllRole } from "../../controllers/admin/role.controller";

const router = Router();

router.route("/").get(getAllRole);

export default router;
