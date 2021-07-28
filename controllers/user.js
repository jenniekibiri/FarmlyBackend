import { User } from "../models/user.js";

export const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "user is not found" });
    }
    req.profile = user;
    next();
  });
};
export const hasAuthorization = (req, res) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorized) {
    return res
      .status(403)
      .json({ error: "user is not authorized to perform this action" });
  }
};
export const allUsers = (req, res, next) => {
  User.find((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(user);
  }).select("name email role created updated");
};

export const allFarmers = (req, res, next) => {
  User.find( {role:"farmer"},(err,user)=>{
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(user);

  })
};
export const allBuyers = (req, res, next) => {
  User.find( {role:"buyer"},(err,user)=>{
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(user);

  })
};
export const allDrivers = (req, res, next) => {
  User.find( {role:"driver"},(err,user)=>{
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(user);

  })
};
export const getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};
export const updateUser = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "you're not authorized to perform this action",
      });
    }
    user.password = undefined;
    res.json({ user });
  });
};
export const deleteUser = (req, res) => {
  const user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "user deleted successfully" });
  });
};
