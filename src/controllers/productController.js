
import productService from "../services/productService.js";


const getAllProducts = async (req, res)=> {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const getProductById =async (req, res)=> {
    try {
        const id = req.params.id;

        const product = await productService.getProductById(id);
        
        if(!product) res.status(404).send("Product not found!");
        res.json(product);

    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const createProduct = async (req, res) =>{
    try {
        const data = await productService.createProduct(req.body);
        // console.log("Product controller...", data);
        res.json(data);  
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateProduct = async (req, res)=> {
    const id = req.params.id;
    try {
       const data =  await productService.updateProduct(id, req.body);
        res.send(data);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await productService.deleteProduct(id);
        res.send(`Product deleted successfully of id: ${id}`)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export {
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};