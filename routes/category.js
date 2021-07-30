import express from "express";
import { isAuth,isAdmin,requireSignin } from "../controllers/auth.js";
import { create, categoryById, getCategoryById, update, remove, getAllCategories } from '../controllers/category.js';
import { userById } from "../controllers/user.js";

const router = express.Router();
//auth
router.get('/category/:categoryId', getCategoryById);
router.get('/categories', getAllCategories);
router.param('categoryId', categoryById);
router.post('/category/create/',  create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.param('userId', userById);

                         
export default router;
