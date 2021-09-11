import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from 'fs'
dotenv.config();


const port = process.env.PORT || 8080;
const app = express();
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/orders.js";
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');
app.use("/api*", (req, res) =>
  res.status(404).send({
    message: "Ooops route does not exist!",
  })
);

app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});


app.listen(port, console.log(`server running on port ${port}`));

