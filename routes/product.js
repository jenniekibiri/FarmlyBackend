import express from "express";
const router = express.Router();

import {
  create,
  productById,
  read,
  remove,
  update,
  list,
  
} from "../controllers/product.js";
router.param("productId", productById);
router.get("/product/:productId", read);
router.post("/product/create/:userId", create);
router.delete("/product/:productId/:userId",remove);
router.put("/product/:productId/:userId",update);
router.get("/products", list);
// router.get("/products/search", listSearch);
// router.get("/products/related/:productId", listRelated);
// router.get("/products/categories", listCategories);
// router.post("/products/by/search", listBySearch);
// router.get("/product/photo/:productId", photo);

export default router;
