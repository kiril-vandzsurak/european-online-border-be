import express from "express";
import UserModel from "./model.js";
import createHttpError from "http-errors";
import { createAccessToken } from "../../lib/auth/tools.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    const payload = { _id: newUser._id };
    const accessToken = await createAccessToken(payload);
    res.status(201).send({ accessToken, _id });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
