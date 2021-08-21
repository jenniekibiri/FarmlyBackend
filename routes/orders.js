import express from "express";
const router = express.Router();

import { isAuth, isAdmin, requireSignin } from "../controllers/auth.js";
import { userById } from "../controllers/user.js";

import {
  orderById,
  create,
  getStatusValues,
  updateOrderStatus,
  listOrders,
  orderByUser,
  deliveryOrders
} from "../controllers/orders.js";
// const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId/",

  create
);

router.get("/order/list/", listOrders);
router.get(
    "/order/by/:userId/:status",
   
    orderByUser
  );
  router.get(
    "/order/:status",
   
    deliveryOrders
  );
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

export default router;
