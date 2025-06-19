import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.MONGODB_URL || "";

mongoose
  .connect(db)
  .then(() => {})
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const wishlistSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  creatorId: ObjectId,
  userId: ObjectId,
});

export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
export const wishlistModel = mongoose.model("wishlist", wishlistSchema);
