import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      required: true,
    },
    followers: {
      type: Array,
      default:[]
    },
    following: {
      type: Array,
      default:[]
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", userSchema);
export default User;
