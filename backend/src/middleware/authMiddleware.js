import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      req.user = null;
      next();
      return;
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      req.user = null;
      next();
      return;
    }

    req.user = user;
    req.role = decoded.role;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
