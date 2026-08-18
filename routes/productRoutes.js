import express from "express"
import multer from "multer"
import { upload } from "../middlewares/uploadMiddleware.js"
import {getProducts,getProduct,createProduct,updateProduct,deleteProduct,getProductsByCategory} from "../controllers/productController.js"

const router = express.Router();

router.route("/").get(getProducts)
router.route("/").post(upload.single("image"), createProduct);
router.route("/category/:category").get(getProductsByCategory)

router.route("/:id").get(getProduct)
router.route("/:id").put(upload.single("image"), updateProduct)
router.route("/:id").delete(deleteProduct);

export default router;