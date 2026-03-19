import { Router } from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../../controllers/admin/user.controller";

const router = Router();

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
