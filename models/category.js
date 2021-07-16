import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
      },
  created: {
    type: Date,
    default: Date.now(),
  },

  updated: Date,
});

export const Category=mongoose.model('category', categorySchema);