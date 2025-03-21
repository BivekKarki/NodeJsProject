import express from "express";
import {
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct, 
    deleteProduct
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";


const router = express.Router();

/**
 * URL: /api/products
 * Method: GET
 * Get all products
 */
router.get("/", getAllProducts);

// router.post("/test", (req, res)=> {
//     res.send("Checking router")
// })

// router.get("/categories", getCategories);

/**
 * URL: /api/products/:id
 * Method: GET
 * Get product by id
 */
router.get("/:id", getProductById);

/**
 * URL: /api/products
 * Method: POST
 * Create product
 */
router.post("/", auth,createProduct);

/**
 * URL: /api/products/:id
 * Method: PUT
 * Update product
 */
router.put("/:id", updateProduct);

/**
 * URL: /api/products/:id
 * Method: DELETE
 * Delete product
 */
router.delete("/:id", deleteProduct);

export default router;