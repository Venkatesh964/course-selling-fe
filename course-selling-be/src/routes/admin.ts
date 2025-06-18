import express from "express";
import { adminModel, courseModel } from "../db/mongoose";
import jwt from "jsonwebtoken";
import adminMiddleware from "../middleware/adminMiddleware";

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });
    if (!user) {
      res.status(403).json({ message: "Unable to create the admin" });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_ADMIN_SECRET || "");
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

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminModel.findOne({ email: email, password: password });
    if (!user) {
      res.status(403).json({
        message: "There is no admin found with the given credentials",
      });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_ADMIN_SECRET || "");
    console.log(token);
    res
      .status(200)
      .cookie("access_token", "Bearer " + token)
      .json({ user });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
});

adminRouter.get("/logout", (req, res) => {
  try {
    res.clearCookie("access_token");
    res.json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: "Failed to clear cache" });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  //@ts-ignore
  const creatorId = req.userId;
  const { title, description, price, imageUrl } = req.body;
  const course = await courseModel.insertOne({
    title,
    description,
    price,
    imageUrl,
    creatorId,
  });
  if (!course) {
    res.status(403).json({ message: "Failed to create the course" });
    return;
  }
  res.json({ course });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  //@ts-ignore
  const creatorId = req.userId;
  const { title, description, price, imageUrl, courseId } = req.body;
  console.log(creatorId);
  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: creatorId,
    },
    {
      title,
      description,
      price,
      imageUrl,
    }
  );
  if (!course) {
    res.status(403).json({ message: "Failed to create the course" });
    return;
  }
  res.json({ course });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    let creatorId = req.userId;
    const result = await courseModel.find({ creatorId: creatorId });
    res.json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});
export default adminRouter;
