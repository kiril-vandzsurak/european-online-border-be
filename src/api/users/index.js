import express from "express";
import UserModel from "./model.js";
import createHttpError from "http-errors";

const userRouter = express.Router();

export default userRouter;
