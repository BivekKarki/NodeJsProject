import { ORDER_STATUS_CONFIRMED, ORDER_STATUS_PENDING } from '../constants/orderStatus.js';
import { ROLE_ADMIN } from '../constants/roles.js';
import Order from '../models/Order.js';
import payViaKhalti from '../utils/khalti.js';
import paymentService from './paymentService.js';

const getAllOrders = async (query)=> {
   // const filter = {}
   // if(filter.status) filter.status = query.status || ORDER_STATUS_PENDING;

   return await Order.find({
      status: query.status || ORDER_STATUS_PENDING
   })
   .sort(JSON.stringify({ createdAt: -1 }))
   .populate("orderItems.product") //to get all the details of product as it is referred in models
   .populate("user", ["name", "email", "phone", "address"]);
}

const getOrdersByUser = async (query, userId)=> {
   
   return await Order.find({
      user: userId,
      status: query?.status || ORDER_STATUS_PENDING,
   })
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
   data.orderNumber = crypto.randomUUID();
   return await Order.create(data);
}

//Initiate payments
const checkOutOrder = async (id, data)=> {
   const order = await Order.findById(id).populate("user", ["name", "email", "phone"]);
      
   if(!order){
      throw{
         statusCode: 404,
         message: "Order not found",
      };
   }

  // initiate khalti payment
  return await payViaKhalti({
     returnUrl: data.returnUrl,
     websiteUrl: data.websiteUrl,
     amount: order.totalPrice,
     orderId: order.id,
     orderName: order.orderNumber,
     customerInfo: order.user,
  })
  

}

const updateOrderStatus = async (id, status)=> {
  
   return await Order.findByIdAndUpdate(
      id, 
      {
         status,
      },
      { new: true }
   )
}

const deleteOrder = async (id, status)=> {
   return await Order.findByIdAndDelete(id)
}

const confirmOrder = async (id, data)=> {
   const order = await Order.findById(id)
     
   if(!order){
      throw{
         statusCode: 404,
         message: "Order not found",
      };
   }

   console.log("Payment status: ", data.status)
   const isPaymentSuccess = data.status == "completed";

  await paymentService.createPayment({
   amount: order.totalPrice,
   paymentMethod: data.paymentMethod || "online",
   status: isPaymentSuccess ? "completed": "failed",
   order: id,
   tranactionId: data.tranactionId
  })

  if(!isPaymentSuccess) throw {
   statusCode: 400,
   message: "Payment failed",
  }

   return await Order.findByIdAndUpdate(
      id, 
      {status: ORDER_STATUS_CONFIRMED},
      { new: true }
   )
}

export default { 
   getAllOrders, 
   createOrder, 
   getOrdersByUser, 
   getOrderById,
   updateOrderStatus,
   deleteOrder,
   checkOutOrder,
   confirmOrder
};