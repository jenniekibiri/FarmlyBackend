import { Router } from "express";
import { authController } from "../controllers/index.js";
const router = new Router();
//auth

router.post('/register',authController.createUser);
router.post('/login',authController.userLogin);

export default router;
