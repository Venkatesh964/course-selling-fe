import express from "express";
import cors from "cors";
import { userModel } from "./db/mongoose";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import courseRouter from "./routes/course";
import cookieParser from "cookie-parser";
// import userRouter from "../src/routes/user";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.get("/health", (req, res) => {
  //   console.log(Student);
  res.json({ msg: "ksksk" });
});

// app.post("/signup", async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   try {
//     const user = await userModel.insertOne({
//       email,
//       password,
//       firstName,
//       lastName,
//     });
//     if (!user) {
//       res.json({ message: "Unable to create the user" });
//       return;
//     }
//     res.json({ user });
//   } catch (e) {
//     res.status(500).json({
//       message: "server error",
//     });
//   }
// });

// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await userModel.findOne({ email, password });
//     if (!user) {
//       res.status(403).json({
//         message: "There is no user found with the given credentials",
//       });
//       return;
//     }
//     res.json({
//       user,
//     });
//   } catch (e) {
//     res.status(500).json({ message: "server error" });
//   }

//   // const user = await User.findOne({
//   //   name: req.body.name,
//   //   password: req.body.password,
//   // });
//   // res.json({ user });
// });

// app.post("/purchase", (req, res) => {});

// app.get("/purchasedCourses", (req, res) => {});

app.listen(3000, () => console.log("listening on port 3000"));
