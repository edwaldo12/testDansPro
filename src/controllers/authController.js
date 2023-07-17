"use strict";
import UserModel from "../models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { keyJWT } from "../config/auth.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const userLogin = await UserModel.findOne({ username: username });
  if (!userLogin) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid user or password." });
  }

  bcrypt.compare(password, userLogin.password, (err, result) => {
    if (result) {
      const verifiedToken = jwt.sign({ userLogin }, keyJWT, {
        expiresIn: "1h",
      });
      res.setHeader("x-access-token", verifiedToken);
      return res.status(200).json({
        status: 200,
        "Message" : "You are logged in successfully"
      });
    }
  });
};