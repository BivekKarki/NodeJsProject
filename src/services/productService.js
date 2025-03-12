import Product from "../models/Product.js";

const getAllProducts = async ()=> {
    const products = await Product.find();
    return products;
}

const getProductById = async (id)=> {
    const product = await Product.findById(id);

    return product;
}

const createProduct = async (data) =>{
    return await Product.create(data);
    // return result;
};
export default {
    createProduct, 
    getAllProducts,
    getProductById,
};


