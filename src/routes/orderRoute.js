import express from 'express';
import { getAllOrders } from '../controllers/orderController.js';

const router = express.Router();


// /api/orders - get all orders
router.get("/", getAllOrders);


export default router;