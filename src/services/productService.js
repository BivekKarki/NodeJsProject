import Product from "../models/Product.js";

//Database related task in service 


const getAllProducts = async ()=> {
    const products = await Product.find();
    return products;
}

const getProductById = async (id)=> {
    const product = await Product.findById(id);

    return product;
}

const createProduct = async (data) =>{
    console.log("Data from postman: ",data);
    return await Product.create(data);
};

const updateProduct = async (id, data)=>{
    return await Product.findByIdAndUpdate(id, data);
}

const deleteProduct = async (id)=> {
    await Product.findByIdAndDelete(id);
}

export default {
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};


