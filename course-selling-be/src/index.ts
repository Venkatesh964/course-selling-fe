import express from "express";
import cors from "cors";
import { userModel } from "./db/mongoose";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import courseRouter from "./routes/course";
import cookieParser from "cookie-parser";

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
  res.json({ msg: "ksksk" });
});

app.listen(3000, () => console.log("listening on port 3000"));
