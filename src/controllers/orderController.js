import orderService from "../services/orderService.js"

const getAllOrders = async (req, res)=>{

    const orders = await orderService.getAllOrders(req.query);
    res.json(orders);
}

const createOrder = async (req, res)=>{
    const input = req.body;
    const user = req.user

    console.log("INput..........",input.orderItems[0]);

    // if(!input.orderNumber){
    //     return res.status(422).send("Order number is required.")
    // }

    if(!input.orderItems || input.orderItems?.length == 0){
        return res.status(422).send("Order items are required.")  
    }

    if(!input.orderItems[0]?.product){
        return res.status(422).send("Order's product is required.")
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

const getOrdersByUser = async (req, res)=> {
    const user = req.user;
    const orders = await orderService.getOrdersByUser(req.query, user.id);
    
    res.json(orders);
}

const getOrderById = async (req, res)=> {
    const id = req.params.id;

    try {
        const order = await orderService.getOrderById(id);
    
        res.json(order);
        
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}

const updateOrderStatus = async (req, res)=> {
    const id = req.params.id;
    const input = req.body;
    // console.log(id)
    
    try {
        await orderService.getOrderById(id);
        if(!input.status)
            return res.status(422).send("Order status is required.")
        
        const order = await orderService.updateOrderStatus(id, input.status);
    
        res.json(order);
        
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}

const deleteOrder = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await orderService.getOrderById(id);
        
        await orderService.deleteOrder(id);
    
        res.send("Order deleted successfully.");
        
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}

const checkOutOrder = async (req, res)=> {
    const id = req.params.id;
    const input = req.body;
    // console.log("helooooooooi",input)
    
    try {
        const order = await orderService.checkOutOrder(id, input);
        // console.log(order)
        res.json(order);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}

const confirmOrder = async (req, res)=> {
    const id = req.params.id;
    const input = req.body;
    
    
    try {
        if(!input.status) 
            return res.status(422).send("Order confirm status is required.")
        const order = await orderService.confirmOrder(id, input);
        // console.log(order)
        res.json(order);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}

export { 
    getAllOrders, 
    createOrder, 
    getOrdersByUser, 
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    checkOutOrder,
    confirmOrder
};