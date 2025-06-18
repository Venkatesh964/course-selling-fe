import express from "express";
import { courseModel, purchaseModel, userModel } from "../db/mongoose";
import jwt from "jsonwebtoken";
import userMiddleware from "../middleware/userMiddleware";

const userRouter = express.Router();
console.log("here");

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await userModel.create({
      email,
      password,
      firstName,
      lastName,
    });
    if (!user) {
      res.json({ message: "Unable to create the user" });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_USER_SECRET || "");
    res
      .status(200)
      .cookie("access_token", "Bearer " + token)
      .json({ user });
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      res.status(403).json({
        message: "There is no user found with the given credentials",
      });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_USER_SECRET || "");
    res
      .status(200)
      .cookie("access_token", "Bearer " + token)
      .json({ user });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
});

userRouter.get("/logout", (req, res) => {
  try {
    res.clearCookie("access_token");
    res.json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: "Failed to clear cache" });
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const purchases = await purchaseModel.find({
      userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i < purchases.length; i++) {
      purchasedCourseIds.push(purchases[i].courseId);
    }

    const coursesData = await courseModel.find({
      _id: { $in: purchasedCourseIds },
    });

    res.json({
      purchases,
      coursesData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

userRouter.get("/bulk", async (req, res) => {
  try {
    const result = await courseModel.find();
    res.json({ courses: result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

export default userRouter;
