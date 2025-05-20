import orderService from "../services/orderService.js"

const getAllOrders = async (req, res)=>{
    const orders = await orderService.getAllOrders();
    res.json(orders);
}

const createOrder = async (req, res)=>{
    const input = req.body;
    const user = req.user

    if(!input.orderNumber){
        return res.status(422).send("Order number is required.")
    }

    if(!input.orderItems || !input.orderItems?.length == 0){
        return res.status(422).send("Order items are required.")  
    }

    if(!input.orderItems[0]?.product){
        return res.status(422).send("Product is required.")
    }

    if(!input.totalPrice){
        return res.status(422).send("Total price is required.")
    }

    if(!input.user){
        input.user = user.id;
    }

    if(!input.shippingAddress){
        if(!user.address){
             return res.status(422).send("Shipping address is required.")
        }
        input.shippingAddress = user.address;
    }

    try {
        const order = await orderService.createOrder(input);
        res.json(order);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }

}

export { getAllOrders, createOrder };