import { Router } from "express";
import { createRole, deleteRole, getAllRole, updateRole } from "../../controllers/admin/role.controller";

const router = Router();

router.route("/").get(getAllRole).post(createRole);
router.route("/:id").put(updateRole).delete(deleteRole);
export default router;
