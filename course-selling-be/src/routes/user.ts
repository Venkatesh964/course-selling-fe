import express from "express";
import {
  cartModel,
  courseModel,
  purchaseModel,
  userModel,
  wishlistModel,
} from "../db/mongoose";
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
    const userId = req.userId.id;
    // const purchases = await purchaseModel.find({
    //   userId: userId,
    // });
    const purchases = await purchaseModel.find({ userId: userId });

    console.log(`purchases `, purchases);
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

userRouter.post("/wishlist", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId.id;
  console.log("userid", userId);
  const { courseId } = req.body;
  console.log("course id", courseId);
  try {
    console.log(wishlistModel);
    const courseExists = await wishlistModel.find({
      courseId: courseId,
      userId: userId,
    });
    console.log(courseExists);
    if (courseExists.length !== 0) {
      res.status(400).json({ msg: "course already exists" });
      return;
    }
    const wishListItem = await wishlistModel.create({
      userId: userId,
      courseId: courseId,
    });
    res.json({ msg: "added to wishlist successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Failed to add to wishlist" });
  }
});

userRouter.delete("/wishlist", userMiddleware, async (req, res) => {
  //@ts-ignore
  let userId = req.userId.id;
  try {
    const item = await wishlistModel.deleteOne({
      userId,
      courseId: req.body.courseId,
    });
    res.json({
      msg: "item deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      msg: "failed to delete from wishlist",
    });
  }
});

userRouter.get("/wishlist", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId.id;
  try {
    const wishlistItems = await wishlistModel.find({ userId: userId });

    let wishlist = [];
    for (let i = 0; i < wishlistItems.length; i++) {
      wishlist.push(wishlistItems[i].courseId);
    }
    const coursesData = await courseModel.find({
      _id: { $in: wishlist },
    });

    res.json({
      wishlistItems,
      coursesData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
});

userRouter.delete("/cart", userMiddleware, async (req, res) => {
  //@ts-ignore
  let userId = req.userId.id;
  try {
    const item = await cartModel.deleteOne({
      userId: userId,
      courseId: req.body.courseId,
    });
    console.log(item);
    res.json({
      msg: "item deleted successfully from cart",
    });
  } catch (e) {
    res.status(500).json({
      msg: "failed to delete from cart",
    });
  }
});

userRouter.post("/cart", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId.id;
  console.log("userid", userId);
  const { courseId } = req.body;
  console.log("course id", courseId);
  try {
    console.log(cartModel);
    const courseItems = await cartModel.find({
      courseId: courseId,
      userId: userId,
    });
    if (courseItems.length !== 0) {
      res.status(400).json({ msg: "course already exists" });
      return;
    }
    console.log(courseItems);
    const cartItem = await cartModel.create({
      userId: userId,
      courseId: courseId,
    });
    console.log(cartItem);
    res.json({ msg: "added to cart successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Failed to add to cart" });
  }
});

userRouter.get("/cart", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId.id;
  try {
    const cartItems = await cartModel.find({ userId: userId });

    let wishlist = [];
    for (let i = 0; i < cartItems.length; i++) {
      wishlist.push(cartItems[i].courseId);
    }
    const coursesData = await courseModel.find({
      _id: { $in: wishlist },
    });

    res.json({
      cartItems,
      coursesData,
    });
  } catch (e) {
    res.status(500).json({});
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
