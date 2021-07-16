import express from 'express'
import morgan from 'morgan'
import routes from './routes/index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const port = 5000
const app =express();

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
     useUnifiedTopology: true 
}).then(()=>console.log('DB connected'));
app.use(morgan('dev'));
app.use('/', routes)

app.listen(port,console.log(`server running on port ${port}`))