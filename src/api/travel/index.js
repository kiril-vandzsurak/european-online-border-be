import express from "express";
import TravelModel from "./model.js";
import UserModel from "../users/model.js";
import { JWTAuthMiddleware } from "../../lib/auth/jwtAuth.js";

const travelRouter = express.Router();

travelRouter.get("/travelAdmin", async (req, res) => {
  try {
    const travels = await TravelModel.find().populate("user");
    res.status(200).send(travels);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

travelRouter.get(
  "/userTravels/:userId/travels",
  JWTAuthMiddleware,
  (req, res) => {
    const userId = req.params.userId;

    TravelModel.find({ user: userId }, { user: 0 })
      .then((travels) => {
        res.status(200).send(travels);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
);

travelRouter.post("/fulfilNewForm", JWTAuthMiddleware, async (req, res) => {
  const { countryTo, wayOfCrossing, dateOfCrossing, timeOfCrossing, userId } =
    req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found.");
    const newTravel = new TravelModel({
      countryTo,
      wayOfCrossing,
      dateOfCrossing,
      timeOfCrossing,
      user,
    });
    await newTravel.save();

    res.status(201).send(newTravel);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default travelRouter;
