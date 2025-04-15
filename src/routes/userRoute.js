import express from "express";
import { createMerchant, createUser, updateUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.post("/", createUser);

// /api/users/merchant
router.post("/merchant", auth, roleBasedAuth(ROLE_ADMIN), createMerchant);

// /api/users/:id
router.put("/:id", auth, roleBasedAuth(ROLE_ADMIN), updateUser);



export default router