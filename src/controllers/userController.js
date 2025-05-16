import { ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import { formatUserData } from "../helpers/dataFormatter.js";
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

const updateUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const merchant = await userService.updateUser(id, req.body);
        res.json(merchant);
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await userService.deleteUser(id);
        res.send(`User deleted successfully of id: ${id}`)
    } catch (error) {
        res.status(500).send(error.message);
    }

}


const getAllUsers = async (req, res)=> {
    try {
        const users = await userService.getAllUsers();
        
        const formattedUsers = users.map(user=>formatUserData(user))
        
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const getAllCustomers = async (req, res)=> {
    try {
        const users = await userService.getAllCustomers();
        
        const formattedUsers = users.map(user=>formatUserData(user))
        
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const getUserById =async (req, res)=> {
    const id = req.params.id;
    const loggenInUser = req.user;
    try {
        const user = await userService.getUserById(id);
        
        if(!user) return res.status(404).send("User not found!");
       
        if(loggenInUser.id != user.id && !user.roles.includes(ROLE_MERCHANT)) {
            return res.status(403).send("Access denied!");
        }

        res.json(user);

    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const uploadProfileImage = async (req, res)=> {
    const file = req.file;
   const userId = req.user.id;

    try {
        const data = await userService.uploadProfileImage(userId, file);
        res.json(formatUserData(data));
        // res.send("File uploaded successfully")
        
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
}
export { 
    createUser, 
    createMerchant,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getAllCustomers,
    uploadProfileImage
};