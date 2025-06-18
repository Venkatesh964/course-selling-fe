import express from "express";
import userMiddleware from "../middleware/userMiddleware";
import { purchaseModel } from "../db/mongoose";

const courseRouter = express.Router();

courseRouter.post("/purchase", userMiddleware, (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const purchase = purchaseModel.insertOne({
      userId,
      courseId: req.body.courseId,
    });
    if (!purchase) {
      res.status(403).json({
        message: "Failed to purchase the course",
      });
      return;
    }

    res.status(200).json({
      purchase,
    });
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
  }
});

// courseRouter.get("/allPurchases", userMiddleware, (req, res) => {});

// courseRouter.get("/purchases", userMiddleware, (req, res) => {
//   console.log("here in purchases");
// });

export default courseRouter;
