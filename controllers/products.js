import { Product, Products } from '../models/product.js';
export default class ProductController {
//create product
static async createProduct (req, res,next) {
    const product = new Product(req.body);
    user
      .save()
      .then(() => {
        res.json({
          message: "product added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });

}

    static async getProducts(req,res){
        Product.find((err, user) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json(user );
          }).select("name email created updated");
    }
    static async getUser(req,res){
        res.status(200).send({message:'user'})
    }

}