import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  const authorization = req.cookies.access_token.split(" ")[1];
  console.log(authorization);
  if (!authorization) {
    res.json({ message: "Authorization is missing" });
    return;
  }
  try {
    const user = jwt.verify(authorization, process.env.JWT_USER_SECRET || "");

    //@ts-ignore
    req.userId = user.id;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
    return;
  }
}

export default userMiddleware;
