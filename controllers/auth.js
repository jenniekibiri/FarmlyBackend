import { User } from '../models/user.js';
import bcrypt from 'bcryptjs'
import { response } from 'express';
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

  

}