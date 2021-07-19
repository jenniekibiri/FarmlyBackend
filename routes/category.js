import express from "express";
import { isAuth,isAdmin,requireSignin } from "../controllers/auth.js";
import { create, categoryById, read, update, remove, list } from '../controllers/category.js';
import { userById } from "../controllers/user.js";

const router = express.Router();
//auth
router.get('/category/:categoryId', read);
router.get('/categories', list);
router.param('categoryId', categoryById);

router.post('/category/create/:userId', requireSignin,  isAdmin, create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/category/:categoryId/:userId', update);

router.delete('/category/:categoryId/:userId', remove);

router.param('userId', userById);


export default router;
