import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//route

app.use("/api/v1/user",userRoute)
app.use("/api/v1/tweet",tweetRoute)

app.listen(3000, () => {
  console.log("server started on port 3000");
});
