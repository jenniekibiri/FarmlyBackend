import { User } from '../models/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config();

export const register = async (req, res, next) => {
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
        res.json({
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  });
};
export const login = (req, res, next) => {
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
};
export const logout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "logout success" });
};

export const requireSignin = expressJwt({
  
  secret: `${process.env.JWT_SECRET}`,
  userProperty: 'auth',
  algorithms: ['RS256']
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
      return res.status(403).json({
          error: 'Access denied'
      });
  }
  next();
};

export const isFarmer = (req, res, next) => {
  if (req.profile.role === 'farmer') {
      return res.status(403).json({
          error: 'Farmer resourse! Access denied'
      });
  }
  next();
};
// export const isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//       return res.status(403).json({
//           error: 'Admin resourse! Access denied'
//       });
//   }
//   next();
// };

// export const isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//       return res.status(403).json({
//           error: 'Admin resourse! Access denied'
//       });
//   }
//   next();
// };