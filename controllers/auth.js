import { User } from '../models/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class authController {
//create user
static async createUser (req, res) {
  console.log(req.body)
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      error: "email is already taken Login!",
    });
  }

  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    const user = new User(req.body);
    user
      .save()
      .then(() => {
          res.status(200).json({
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
         res.status(500).json({
          error,
        });
      });
  });

}
//user login
static async userLogin (req, res) {
    const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "email doesnt exist",
      });
    }

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          res.json({
            message: "password doesnt match",
          });
        } else {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.cookie("t", token, { expire: new Date() + 9999 });
          const { _id, name } = user;
          return res.json({ token, user: { _id, email, name } });
        }
      });
    }
  });
  }

  

}