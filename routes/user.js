import { Router } from 'express'
import { UserController } from '../controllers/index.js';
const router = new Router()
//user 

router.route('/all').get(
UserController.getUsers

)
router.route('/id').get(
    UserController.getUser
    
    )

export default router