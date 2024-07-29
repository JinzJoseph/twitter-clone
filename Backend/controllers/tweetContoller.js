import Tweet from "../models/tweetModel.js";
import _ from "lodash";
import User from "../models/userModel.js";
export const createTweet = async (req, res) => {
  try {
    const { desc, id } = req.body;
    const description=desc
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required",
        success: false,
      });
    }
    const user=await User.findById((id)).select("-password")
    await Tweet.create({
      description,
      userId: id,
      userDetails:user
    });
    return res.status(200).json({
      message: "Tweet Created successsfull",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet successfully deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};



export const likeOrDislike = async (req, res) => {
  try {
    const loggedUserId = req.body.id;
    console.log(loggedUserId);
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    if (tweet.like.includes(loggedUserId)) {
      // Dislike
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { like: loggedUserId } }
      );
      return res.status(200).json({
        message: "User disliked tweet",
        success: true,
      });
    } else {
      // Like
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { like: loggedUserId } }
      );
      return res.status(200).json({
        message: "User liked tweet",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};

export const getAllTweet = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const loggedUser = await User.findById(id);

    // Find tweets of the logged-in user
    const loggedUserTweets = await Tweet.find({ userId: loggedUser._id });

    // Find tweets of the followed users
    const followingUserTweets = await Promise.all(
      loggedUser.following.map((followedUserId) => {
        return Tweet.find({ userId: followedUserId });
      })
    );

    // Flatten the array of tweets
    const allFollowingTweets = followingUserTweets.flat();
    console.log(loggedUserTweets.concat(allFollowingTweets));
    return res.status(200).json({
      tweets: loggedUserTweets.concat(allFollowingTweets),
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};

export const getFollowingTweet = async (req, res) => {
  try {
    const id = req.params.id;
    const loggeduser = await User.findById(id);
    const followingTweet = await Promise.all(
      loggeduser.following.map((id) => {
        return Tweet.find({ userId: id });
      })
    );
    return res.status(200).json({
      tweet: [].concat(...followingTweet),
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};
