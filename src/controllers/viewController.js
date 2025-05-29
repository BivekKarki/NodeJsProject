const homePage = (req, res)=> {
    res.render("home", {username: "Bivek"})
}

const productsPage = (req, res)=> {
    res.render("products")
}

export { homePage, productsPage }