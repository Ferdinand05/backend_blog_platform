import { Router } from "express";
import { getAllCategory } from "../../controllers/public/category.controller";

const router = Router();

router.get("/", getAllCategory);

export default router;
