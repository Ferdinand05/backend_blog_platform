import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../../controllers/admin/category.controller";

const router = Router();

router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);
export default router;
