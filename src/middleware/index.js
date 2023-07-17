import jwt from "jsonwebtoken";
import { keyJWT } from "../config/auth.js";

export const verifyToken = async function (req, res, next) {
  let tokenUser = req.headers["x-access-token"];
  if (!tokenUser) {
    return res.status(403).json({
      Message: "Login first!",
    });
  }

  try {
    let decoded = jwt.verify(tokenUser, keyJWT, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          Message: "invalid token!",
        });
      }
      return decoded;
    });
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(403).json({
        Message: "Your session login has expired",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      Message: "Invalid token!",
    });
  }
}
