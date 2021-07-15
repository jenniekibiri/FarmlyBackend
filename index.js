const  express = require ('express');
const  morgan= require('morgan');
require('dotenv').config();
const port = 5000
const app =express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
     useUnifiedTopology: true 
}).then(()=>console.log('DB connected'));
app.use(morgan('dev'))
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(port,console.log(`server running on port ${port}`))