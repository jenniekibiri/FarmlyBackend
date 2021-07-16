import { Product} from '../models/product.js';
export default class ProductController {
//create product
static async createProduct (req, res,next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => {
        res.json({
          message: "product added successfully!",
          product,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });    

}

    static async getProducts(req,res){
        Product.find((err, product) => {
            if (err) {
              return res.status(400).json({ error: err });
            }
            res.json(product );
          }).select("productName description price quantity created updated");
    }
    static async getProduct(req,res){
        res.status(200).send({message:'product'})
    }

}