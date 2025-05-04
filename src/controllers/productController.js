
import { ROLE_ADMIN } from "../constants/roles.js";
import productService from "../services/productService.js";


const getAllProducts = async (req, res)=> {
    try {
        const products = await productService.getAllProducts(req.query);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const getProductById =async (req, res)=> {
    try {
        const id = req.params.id;

        const product = await productService.getProductById(id);
        
        if(!product) return res.status(404).send("Product not found!");
        res.json(product);

    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const createProduct = async (req, res) =>{
    const userId = req.user.id;
    try {
        const data = await productService.createProduct(req.body, userId);
        // console.log("Product controller...", data);
        res.json(data);  
    } catch (error) {
        console.log("Hello error",error);
        res.status(500).send(error.message);
    }
}

  

const updateProduct = async (req, res)=> {
    const id = req.params.id;
    const user = req.user;
    try {
        const product = await productService.getProductById(id);
        
        if(!product) return res.status(404).send("Product not found!");
        
        if(product.createdBy != user.id && !user.roles.includes(ROLE_ADMIN)) {
            return res.status(403).send("Access denied!");
        }

       const data =  await productService.updateProduct(id, req.body);
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    try {
        const product = await productService.getProductById(id);
        
        if(!product) return res.status(404).send("Product not found!");
        
        if(product.createdBy != user.id && !user.roles.includes(ROLE_ADMIN)) {
            return res.status(403).send("Access denied!");
        }

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