import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "product" },
  },
  { timestamps: true }
);

export const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    product: { type: Object, ref: "product" },
    transaction_id: {},
    amount: { type: Number },
    numOfItems: Number,
    shippingAddress: String,

    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ], // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
