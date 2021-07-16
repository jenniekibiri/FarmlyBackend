import { Category } from '../models/Category.js';
export default class CategoryController {
//create Category
static async createCategory (req, res,next) {
    console.log(req.body)
    const categoryExists = await Category.findOne({ categoryName: req.body.categoryName });
    if (categoryExists) {
      return res.status(403).json({
        error: "category exists in the database",
      });
    }
    const category = new Category(req.body);
    category
      .save()
      .then(() => {
        res.json({
          message: "Category added successfully!",
          category,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });

}

    static async getCategories(req,res){
        Category.find((err, category) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json(category );
          }).select("CategoryName created updated");
    }
    static async getCategory(req,res){
        res.status(200).send({message:'category'})
    }

}