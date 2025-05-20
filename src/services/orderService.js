import Order from '../models/Order.js';

const getAllOrders = async ()=> {
   return await Order.find();
}

export default { getAllOrders };