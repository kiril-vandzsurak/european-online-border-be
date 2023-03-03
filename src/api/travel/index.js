import express from "express";
import TravelModel from "./model.js";
import createHttpError from "http-errors";

const travelRouter = express.Router();

travelRouter.post("/", async (req, res, next) => {
  try {
    const newTravel = new TravelModel(req.body);
    const { _id } = await newTravel.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

export default travelRouter;
