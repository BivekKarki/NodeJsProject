import express from 'express';
import auth from "../middlewares/auth.js";
import { checkOutOrder, confirmOrder, createOrder, deleteOrder, getAllOrders, getOrderById, getOrdersByUser, updateOrderStatus } from '../controllers/orderController.js';
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();


// /api/orders - get all orders
router.get("/", auth, roleBasedAuth(ROLE_ADMIN), getAllOrders);

// /api/orders/user - get orders by user
router.get("/user/:userId", auth, getOrdersByUser);

// /api/orders/id - get orders by user
router.get("/:id", auth, getOrderById);

// /api/orders - get all orders
router.post("/", auth, createOrder);

router.put("/:id/status", auth, roleBasedAuth(ROLE_ADMIN), updateOrderStatus);

router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteOrder);

router.put("/:id/checkout", auth, checkOutOrder);

router.put("/:id/confirm", auth, confirmOrder);


export default router;