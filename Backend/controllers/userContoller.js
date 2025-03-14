import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
export const Register = async (req, res) => {
  //console.log(req.body)
  try {
    const { name, username, email, password } = req.body;
    //  console.log(name,email,password)
    if (!name || !username || !email || !password) {
      return res.status(201).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User Already Exits",
        success: false,
      });
    }
    const hashpassword = await bcryptjs.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: hashpassword,
    });
    res.status(200).json({
      message: "Account created successfull",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password); // compare plain password with hashed password
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logout successfully",
    success: true,
  });
};
export const bookmarks = async (req, res) => {
  try {
    const loggedUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedUserId);
    if (user.bookmarks.includes(tweetId)) {
      //unsave
      await User.findByIdAndUpdate(
        { loggedUserId },
        _.pull(user.bookmarks, tweetId)
      );
      return res.status(200).json({
        message: "user unsaved your tweet",
      });
    } else {
      //save
      await User.findByIdAndUpdate(
        {
          loggedUserId,
        },
        _.pull(user.bookmarks, tweetId)
      );
      return res.status(200).json({
        message: "user saved your tweet",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};
export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      message: "Suucessfully fetched user data",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );

    if (!otherUsers || otherUsers.length === 0) {
      return res.status(404).json({
        message: "No other users found",
        success: false,
      });
    }

    return res.status(200).json({
      otherUsers,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInuserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInuserId);
    const user = await User.findById(userId);
    if (!user.followers.includes(loggedInuserId)) {
      await User.updateOne({ $push: { followers: loggedInuserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });
    } else {
      return res.status(400).json({
        message: `user already follwed to ${user.name}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} just follow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error occured due to ${error.message}`,
      success: false,
    });
  }
};
export const unfollow = async (req, res) => {
  try {
    const loggedInuserId = req.body.id;
    const userId = req.params.id;

    // Fetch both the logged-in user and the user to unfollow
    const loggedInUser = await User.findById(loggedInuserId);
    const user = await User.findById(userId);

    // Check if both users exist
    if (!loggedInUser || !user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if the logged-in user is following the other user
    if (loggedInUser.following.includes(userId)) {
      // Remove userId from loggedInUser's following list
      await loggedInUser.updateOne({ $pull: { following: userId } });

      // Remove loggedInUserId from user's followers list
      await user.updateOne({ $pull: { followers: loggedInuserId } });

      return res.status(200).json({
        message: `${loggedInUser.name} unfollowed ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `You are not following ${user.name}`,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error occurred due to ${error.message}`,
      success: false,
    });
  }
};

