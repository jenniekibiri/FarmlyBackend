import { Category } from '../models/Category.js';
export default class CategoryController {
//create Category
static async createCategory (req, res,next) {
    const Category = new Category(req.body);
    user
      .save()
      .then(() => {
        res.json({
          message: "Category added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });

}

    static async getCategories(req,res){
        Category.find((err, user) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json(user );
          }).select("CategoryName created updated");
    }
    static async getCategory(req,res){
        res.status(200).send({message:'category'})
    }

}