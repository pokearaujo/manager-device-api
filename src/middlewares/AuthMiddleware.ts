import { NextFunction, Request, Response } from "express";
import { TOKEN } from "./../settings";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  if (token !== TOKEN) {
    return res.status(401).send("Unauthorized");
  }

  next();
};
