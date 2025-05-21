import Order from '../models/Order.js';

const getAllOrders = async ()=> {
   return await Order.find();
}

const getOrdersByUser = async (userId)=> {
   return await Order.find({user: userId});
}

const createOrder = async (data)=> {
   return await Order.create(data);
}

export default { getAllOrders, createOrder, getOrdersByUser };