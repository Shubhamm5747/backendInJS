import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js"
import { Verifyjwt } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
//added a middleware named Verifyjwt here
router.route("/logout").post(Verifyjwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;