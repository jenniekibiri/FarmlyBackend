import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const port = 5000;
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
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", productRoutes);
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');
app.use("*", (req, res) =>
  res.status(404).send({
    message: "Ooops route does not exist!",
  })
);
app.use(function(req, res, next) {
  console.log(`logging: req: ${util.inspect(req)}`);
  next();
});
app.listen(port, console.log(`server running on port ${port}`));
