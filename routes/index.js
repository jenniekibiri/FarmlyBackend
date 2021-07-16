import { Router } from 'express'
import userRouters from './user.js'
import authRouters from './auth.js'
import categoryRouters from './category.js'
import productRouters from './product.js'
import router from './user.js';


router.get('/',(req,res)=>{
    res.status(200).send({message:'test route'})
})
router.use('/user', userRouters)
router.use('/auth',authRouters)
router.use('/category',categoryRouters)
router.use('/product',productRouters)
//routes
export default router;