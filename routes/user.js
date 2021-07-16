import { Router } from "express";
import { UserController } from "../controllers/index.js";
const router = new Router();
//user


router.get('/users',UserController.getUsers);
router.get('/id',UserController.getUser);


export default router;
