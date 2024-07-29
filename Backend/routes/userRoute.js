import express from "express"
import { bookmarks, follow, getMyProfile,  getOtherUsers, Login, logout, Register, unfollow } from "../controllers/userContoller.js"
import isAuthenticated from "../middlewares/verifyUser.js";
const router=express.Router()
router.post("/signup",Register);
router.post("/login",Login);
router.get("/logout",isAuthenticated,logout);
router.post("/bookmark/:id",isAuthenticated,bookmarks);
router.get("/myprofile/:id",isAuthenticated,getMyProfile);
router.get("/getotheruser/:id",isAuthenticated,getOtherUsers);
router.post("/follow/:id",isAuthenticated,follow);
router.post("/unfollow/:id",isAuthenticated,unfollow);

export default router;