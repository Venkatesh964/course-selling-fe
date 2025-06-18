import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.cookies.access_token.split(" ")[1];
  console.log(authorization);
  if (!authorization) {
    res.json({ message: "Authorization is missing" });
    return;
  }
  const id = jwt.verify(authorization, process.env.JWT_USER_SECRET || "");
  //@ts-ignore
  req.userId = id;
  next();
}

export default userMiddleware;
