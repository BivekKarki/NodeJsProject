import express from 'express';
import auth from "../middlewares/auth.js";
import { createOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();


// /api/orders - get all orders
router.get("/", auth, getAllOrders);

// /api/orders - get all orders
router.post("/", auth, createOrder);


export default router;