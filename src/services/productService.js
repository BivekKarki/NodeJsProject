import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";

//Database related task in service 

// 1. Sort Product: {fieldName: Order} e.g. {price:} 1: ASC | -1: DESC
// 2. Limit: Max no. of items

const getAllProducts = async (query, userId)=> {
    console.log(query);
    const sortQuery = JSON.parse(query.sort || "{}")
    const limitQuery = query.limit;
    const offsetQuery = query.offset;

    const filters = {};
    const { category, brands, name, min, max} = query;  // yo destructured items vaneko chai uta postman bata rakheko keys haru ho

    if (category) filters.category = category;
    if (brands) {
        const brandItems = brands.split(",")
        filters.brand = {
            $in: brandItems,
        };
    }
    if(name){
        filters.name = {
            $regex:name, 
            $options: "i"
        }
    }

    if(min) filters.price = {
        $gte: parseFloat(min)
    }

    if(max) filters.price = {
        ...filters.price,
        $lte: parseFloat(max)
    }

    if(userId) filters.createdBy = userId;

    //for e.g. filters.brand = ["Apple", "Samsung"]

    // yo filters.item vaneko item haru chai model ko item ho

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

const createProduct = async (data, file, userId) =>{
    const uploadedfile = await uploadFile(file);
    console.log("Data from postman: ",data, file);
    return await Product.create({
        ...data, 
        createdBy: userId,
        imageUrls: [uploadedfile?.url],
    });
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


