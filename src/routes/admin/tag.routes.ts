import { Router } from "express";
import { createTag, deleteTag, getAllTag, updateTag } from "../../controllers/admin/tag.controller";

const router = Router();

router.route("/").get(getAllTag).post(createTag);

router.route("/:id").put(updateTag).delete(deleteTag);

export default router;
