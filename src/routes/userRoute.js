import express from "express";
import { createMerchant, createUser, deleteUser, getAllCustomers, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";

const router = express.Router();

router.post("/", createUser);

// /api/users/merchant
router.post("/merchant", auth, roleBasedAuth(ROLE_ADMIN), createMerchant);

// /api/users/:id
router.put("/:id", auth, roleBasedAuth(ROLE_ADMIN), updateUser);

// /api/users/:id
router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteUser);

// /api/users/
router.get("/", auth, roleBasedAuth(ROLE_ADMIN), getAllUsers);

router.get("/customers", auth, roleBasedAuth(ROLE_MERCHANT), getAllCustomers);

// /api/users/:id
router.get("/:id",auth, roleBasedAuth(ROLE_MERCHANT), getUserById);


export default router