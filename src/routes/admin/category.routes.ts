import { Router } from "express";
import { getAllCategory } from "../../controllers/admin/category.controller";

const router = Router();

router.route("/").get(getAllCategory);

export default router;
