import { Router } from 'express'
import { UserController } from '../controllers/index.js';
const router = new Router()
//user 

router.route('/').get(
UserController.getUsers

)

export default router