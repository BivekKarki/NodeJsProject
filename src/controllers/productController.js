
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

const getProductsByUserId = async ()=>{
    try {
        const products = await productService.getAllProducts(req.query, req.user.id);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const getProductById =async (req, res)=> {
    console.log("Get product by id controller")
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
    const files = req.files;
    const input = req.body;

      if (!files) return res.status(400).json({ error: "No file uploaded" });
    // console.log(files);
    try {
        const data = await productService.createProduct(input, files, userId);
        // console.log("Product controller...", data);
        res.json(data);  
    } catch (error) {
        res.status(500).send(error.message);
    }
}

  

const updateProduct = async (req, res)=> {
    const id = req.params.id;
    const user = req.user;
    const files = req.files;
    const input = req.body;

    try {
        const product = await productService.getProductById(id);
        
        if(!product) return res.status(404).send("Product not found!");
        
        if(product.createdBy != user.id && !user.roles.includes(ROLE_ADMIN)) {
            return res.status(403).send("Access denied!");
        }

       const data =  await productService.updateProduct(id, input, files);
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


const getCategories = async (req, res) => {
  const categories = await productService.getCategories();

  res.json(categories);
};

const getBrands = async (req, res) => {
  const brands = await productService.getBrands();

  res.json(brands);
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  const products = await productService.getAllProducts({ category });

  const formattedProducts = products.map((product) =>
    formatProductData(product)
  );

  res.json(formattedProducts);
};

const getProductsByBrand = async (req, res) => {
  const brand = req.params.brand;

  const products = await productService.getAllProducts({ brands: brand });

  const formattedProducts = products.map((product) =>
    formatProductData(product)
  );

  res.json(formattedProducts);
};


export {
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUserId,
    getBrands,
    getCategories,
    getProductsByBrand,
    getProductsByCategory
};