import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  postedBy: {
    type: ObjectId,
    ref:'User',
  },
  category: {
    type: ObjectId,
    ref:'Category',
  },
  created: {
    type: Date,
    default: Date.now(),
  },

  updated: Date,
});

export const Product =mongoose.model('product', productSchema);