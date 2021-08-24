import { Product } from "../models/product.js";
import formidable from "formidable";
import { Category } from "../models/category.js";
export const productById = (req, res, next, id) => {
  Product.findById(id)
    // .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

export const read = (req, res) => {
  req.product.photo = undefined;

  return res.json(req.product);
};

export const create = async (req, res) => {

    req.body.postedBy = req.profile;
      const { productName, description, price, quantity, category } = req.body;
      console.log(req.body)
    if (!productName || !description || !price || !quantity || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // fields.postedBy=req.profile;
    const query = { categoryName: req.body.category };
    Category.findOne(query, (err, category) => {
    
      if (category) {
        req.body.category = category;
        let product = new Product(req.body);
        // 1kb = 1000
        // 1mb = 1000000
        // if (files.photo) {
        //   // console.log("FILES PHOTO: ", files.photo);
        //   if (files.photo.size > 1000000) {
        //     return res.status(400).json({
        //       error: "Image should be less than 1mb in size",
        //     });
        //   }
        //   product.photo.data = fs.readFileSync(files.photo.path);
        //   product.photo.contentType = files.photo.type;
        // }

        product.save((err, result) => {
          if (err) {
            console.log("PRODUCT CREATE ERROR ", err);
            return res.status(400).json({
              error: console.log(err),
            });
          }
          res.json(result);
        });
      }
    });
  
};

export const remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: console.log(err)
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
export const list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    // .select("-photo")
    .populate("category")
    
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
    
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
      console.log(products)
    });
};
export const listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id categoryName")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};
 export const ProductsByUser = (req, res) => {
   console.log(req.profile._id)
  Product.find({ postedBy: req.profile._id })
    .populate("postedBy", "firstName email ")
    .populate("category")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: console.log(err)
        });
      }
      res.json(posts);
    });
};