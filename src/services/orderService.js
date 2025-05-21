import { ORDER_STATUS_PENDING } from '../constants/orderStatus.js';
import { ROLE_ADMIN } from '../constants/roles.js';
import Order from '../models/Order.js';

const getAllOrders = async (query)=> {
   const filter = {}
   if(filter.status) filter.status = query.status || ORDER_STATUS_PENDING;

   return await Order.find()
   .sort(JSON.stringify({ createdAt: -1 }))
   .populate("orderItems.product") //to get all the details of product as it is referred in models
   .populate("user", ["name", "email", "phone", "address"]);
}

const getOrdersByUser = async (userId)=> {
   return await Order.find({user: userId})
   .populate("orderItems.product") //to get all the details of product as it is referred in models
   .populate("user", ["name", "email", "phone", "address"]);
}

const getOrderById = async (id)=> {
    const order = await Order.findById(id)
      .populate("orderItems.product") //to get all the details of product as it is referred in models
      .populate("user", ["name", "email", "phone", "address"]);

   if(!order){
      throw{
         statusCode: 404,
         message: "Order not found",
      };
   }

   return order;

   }

const createOrder = async (data)=> {
   return await Order.create(data);
}

export default { 
   getAllOrders, 
   createOrder, 
   getOrdersByUser, 
   getOrderById 
};