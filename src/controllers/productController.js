import productService from "../services/productService.js";

const createProduct = async (req, res) =>{
    try {
        const data = await productService.createProduct(req.body);

        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default createProduct;