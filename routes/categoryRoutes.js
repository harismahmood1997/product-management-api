import { createCategory,updateCategory,deleteCategory,getCategories,getCategory } from "../controllers/categoryController.js"

import express from "express"

const router = express.Router();

router.route("/").get(getCategories)
router.route("/").post(createCategory)

router.route("/:id").get(getCategory)
router.route("/:id").put(updateCategory)
router.route("/:id").delete(deleteCategory)

export default router