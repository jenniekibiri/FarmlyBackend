import { Router } from "express";
import { categoryController } from "../controllers/index.js";
const router = new Router();
//auth

router.post('/category',categoryController.createCategory);
router.get('/categories',categoryController.getCategories);

export default router;
