import express from "express";

import isAuthenticated from "../middlewares/verifyUser.js";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  getFollowingTweet,
  likeOrDislike,
} from "../controllers/tweetContoller.js";
const router = express.Router();
router.post("/create", isAuthenticated, createTweet);
router.delete("/deleteTweet/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeOrDislike);
router.get("/getalltweet/:id",isAuthenticated,getAllTweet);
router.get("/getallfollowingtweet/:id",isAuthenticated,getFollowingTweet)
export default router;
