import { Router } from 'express'
import userRouters from './user.js'
import router from './user.js';


router.get('/',(req,res)=>{
    res.status(200).send({message:'test route'})
})
router.use('/user', userRouters)
//routes
export default router;