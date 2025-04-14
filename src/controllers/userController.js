import userService from "../services/userService.js"

const createUser = async (req, res)=> {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createMerchant = async (req, res)=> {
    try {
        const merchant = await userService.createMerchant(req.body);
        res.json(merchant);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
}

const updateMerchant = async (req, res)=> {
    try {
        const id = req.params.id;
        const merchant = await userService.updateMerchant(id, req.body);
        res.json(merchant);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
}

export { 
    createUser, 
    createMerchant,
    updateMerchant 
};