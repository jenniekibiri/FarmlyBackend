import { Category } from "../models/Category.js";


export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};
//create Category
export const create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
//get categoryby id
export const getCategoryById = (req, res) => {
  return res.json(req.category);
};

//update
export const update = (req, res) => {
  console.log("req.body", req.body);
  console.log("category update param", req.params.categoryId);

  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
//delete

export const remove = (req, res) => {
  const category = req.category;
  Product.find({ category }).exec((err, data) => {
    if (data.length >= 1) {
      return res.status(400).json({
        message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`,
      });
    } else {
      category.remove((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({
          message: "Category deleted",
        });
      });
    }
  });
};
//all categories
export const getAllCategories = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
