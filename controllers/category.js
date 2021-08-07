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
export const create =async (req, res) => {
    const categoryExists= await Category.findOne({
        categoryName:req.body.categoryName
    });
    if(categoryExists){
        return res.status(403).json({error:'category already exists!'})
    }
  const category = new Category(req.body);

  category.save((err, data) => {
    if (err) {
  
      return res.status(400).json({
        error:console.log(err),
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
  const { category } = req;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "category deleted succefully",
    });
  });
};
//all categories
export const getAllCategories = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: console.log(err),
      });
    }
    res.json(data);
  });
};
