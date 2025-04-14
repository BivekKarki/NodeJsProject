import express from "express";
import { createMerchant, createUser, updateMerchant } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.post("/", createUser);

// /api/users/merchant
router.post("/merchant", auth, roleBasedAuth(ROLE_ADMIN), createMerchant);


router.put("/merchant/:id", auth, roleBasedAuth(ROLE_ADMIN), updateMerchant);



export default router