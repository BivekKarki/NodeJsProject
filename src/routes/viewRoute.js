import express from "express"
import { homePage, productsPage } from "../controllers/viewController.js";

const router = express.Router();

router.get("/home", homePage);
router.get("/products", productsPage);

export default router;