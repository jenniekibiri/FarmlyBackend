import express from 'express'
import morgan from 'morgan'
import routes from './routes/index.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.use('*', (req, res) => res.status(404).send({
    message: 'Ooops route does not exist!'
  }));

app.listen(port,console.log(`server running on port ${port}`))