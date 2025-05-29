import productService from "../services/productService.js"

const homePage = (req, res)=> {
    res.render("home", {username: "Bivek"})
}

const productsPage = async (req, res)=> {
    const products = await productService.getAllProducts({sort:"{}"});
    res.render("products", {products})
}

export { homePage, productsPage }