import express from "express";
import {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    allFarmers,
    allBuyers,
    allDrivers,
  } from "../controllers/user.js"
const router = express.Router();

//user
router.get("/users", allUsers);
router.get("/farmers", allFarmers);
router.get("/buyers", allBuyers);
router.get("/drivers", allDrivers);
router.param("userId", userById);
router.get("/user/:userId", getUser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
