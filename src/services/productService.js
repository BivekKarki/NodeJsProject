import Product from "../models/Product.js";

const createProduct = async (data) =>{
    return await Product.create(data);
    // return result;
};
export default {createProduct};


