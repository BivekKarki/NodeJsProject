import Product from "../models/Product.js";

//Database related task in service 

// 1. Sort Product: {fieldName: Order} e.g. {price:} 1: ASC | -1: DESC
// 2. Limit: Max no. of items

const getAllProducts = async (query)=> {
    console.log(query);
    const sortQuery = JSON.parse(query.sort || "{}")
    const limitQuery = query.limit;
    const offsetQuery = query.offset;

    const filters = {};
    const { category, brands} = query;

    if (category) filters.category = category;
    if (brands) {
        const brandItems = brands.split(",")
        filters.brand = {
            $in: brandItems,
        };
    }

    // const products = await Product.find({
        //     category: {
            //         $regex: category,
            //         $options: "i",
            //     },
            // })
    const products = await Product.find(filters)
    .sort(sortQuery)
    .limit(limitQuery)
    .skip(offsetQuery);

    return products;
}

const getProductById = async (id)=> {
    const product = await Product.findById(id);

    return product;
}

const createProduct = async (data, userId) =>{
    // console.log("Data from postman: ",data);
    return await Product.create({...data, createdBy: userId});
};

const updateProduct = async (id, data)=>{
    return await Product.findByIdAndUpdate(id, data, {
        new: true,
    });
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


