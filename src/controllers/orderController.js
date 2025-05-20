import orderService from "../services/orderService.js"

const getAllOrders = async (req, res)=>{
    const orders = await orderService.getAllOrders();
    res.json(orders);
}

export { getAllOrders };