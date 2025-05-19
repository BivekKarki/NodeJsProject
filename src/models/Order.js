import mongoose, { Types } from "mongoose";

new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {type: Number, required: true,},
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "confirmed", "shipped", "delivered" ],
    },
    shippingAddress: {
        type: String,
        required: true,
    },

});

/**
 * OrderNumber: 
 * UserIs: FK
 * products, quantity
 * total price: payment price
 * status: pending, confirmed, shipped, delivered
 * shippingAddressed: 
 * createdAt:
 * paymentId:
 * 
 */