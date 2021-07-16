import { Router } from "express";
import { categoryController } from "../controllers/index.js";
const router = new Router();
//auth

router.post('/create',categoryController.createCategory);
router.get('/all',categoryController.getCategories);

export default router;
