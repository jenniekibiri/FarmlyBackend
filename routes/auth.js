import { Router } from "express";
import { authController } from "../controllers/index.js";
const router = new Router();
//auth

router.post('/register',authController.createUser);

export default router;
