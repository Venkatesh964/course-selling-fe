import express from "express";
import userMiddleware from "../middleware/userMiddleware";
import { courseModel, purchaseModel } from "../db/mongoose";

const courseRouter = express.Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId.id;
  console.log(userId);
  try {
    const purchase = await purchaseModel.insertOne({
      userId,
      courseId: req.body.courseId,
    });
    if (!purchase) {
      res.status(403).json({
        message: "Failed to purchase the course",
      });
      return;
    }
    // const p = await purchaseModel.find({ userId: userId });
    // console.log(`purchases `, p);
    res.status(200).json({
      purchase,
    });
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
  }
});

courseRouter.get("/:search", userMiddleware, async (req, res) => {
  console.log("here");
  const searchString = req.params.search;
  console.log(searchString);
  //@ts-ignore
  const userId = req.userId.id;
  if (searchString === "") {
    const response = await courseModel.find({});
    res.json({ response });
    return;
  }

  const response = await courseModel.find({
    title: { $regex: new RegExp(searchString, "i") },
  });

  console.log(response);
  res.json({ response });
  //res.json({ msg: "hello" });
  try {
  } catch (e) {
    console.log(`search endpoint`, e);
    res.status(500).json({
      msg: "Failed to search the given string",
    });
  }
});

// courseRouter.get("/allPurchases", userMiddleware, (req, res) => {});

// courseRouter.get("/purchases", userMiddleware, (req, res) => {
//   console.log("here in purchases");
// });

export default courseRouter;
