import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  product: { type: ObjectId, ref: "product" },
  name: String,
  price: Number,
  count: Number,

  created: {
    type: Date,
    default: Date.now(),
  },
  updated: Date,
});

export const Cart = mongoose.model("cart", cartSchema);
