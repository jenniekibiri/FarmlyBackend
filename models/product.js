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
    data: Buffer,
    contentType: String
  },
  quantity: {
    type: Number,
    required: true,
    required: true,
    trim: true,
  },
  postedBy: {
    type: ObjectId,
    ref:'user',
  },
  category: {
    type: ObjectId,
    ref:'category',
  },
  created: {
    type: Date,
    default: Date.now(),
  },

  updated:{
    type: Date,
    default: Date.now(),
  },
});

export const Product =mongoose.model('product', productSchema);