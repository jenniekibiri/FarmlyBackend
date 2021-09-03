import { Order } from "../models/order.js";
import dotenv from "dotenv";
dotenv.config();
import { Product } from "../models/product.js";
// const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SG);

export const orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: console.log(err),
        });
      }
      req.order = order;
      next();
    });
};
export const orderByUser = (req, res) => {
    console.log(req.profile._id)
    Order.find({$and:[ {user: {
       _id:req.profile._id
   } },{status: req.params.status }]})
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
 export const  deliveryOrders = (req, res) => {

  (req.params)
 Order.find({status: req.params.status })
   .populate("postedBy", "firstName email ")
   .populate("category")
   .sort("_created")
   .exec((err, posts) => {
     if (err) {
       return res.status(400).json({
         error: (err)
       });
     }
     res.json(posts);
   });
};
export const create = (req, res) => {
  (req.body.numOfItems);
  req.body.user = req.profile;
  const order = new Order(req.body);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: console.log(error),
      });
    }
    // send email alert to admin
    // order.address
    // order.products.length
    // order.amount
    const emailData = {
      to: `${req.body.user.email}`,
      from: "jennieycharles@gmail.com",
      subject: `A new order is received`,
      html: `
            <img width='100% 'height="125" src="https://i.imgur.com/sAklWb3.png">
            <p>Hi, ${req.body.user.firstName}</p>
            <p>Total products: ${req.body.numOfItems}</p>
            <p>Total cost:Ksh ${req.body.amount} </p>
            <p>Login to your account to Track and see the order details.</p>
        `,
    };
    sgMail
      .send(emailData)
      .then((response) => {
        console.log("Message sent");
      })
      .catch((error) => {
        console.log(error.response.body);
      });
    res.json(data);
  });
};

export const listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id email address")
    // .populate('products', 'productName price')

    // .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: console.log(err),
        });
      }

      res.json(orders);
    });
};

export const getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

export const updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: console.log(err),
        });
      }
      res.json(order);
    }
  );
};
