import mongoose from "mongoose";

const { Schema, model } = mongoose;

const travelSchema = new Schema(
  {
    countryTo: { type: String, required: true },
    wayOfCrossing: {
      type: String,
      required: true,
      enum: ["By walk", "By car"],
    },
    carNumber: { type: String, required: false },
    carProducer: { type: String, required: false },
    drivingLicenseNum: { type: String, required: false },
    carInsuranceNum: { type: String, required: false },
    carRegistrationNum: { type: String, required: false },
    dateOfCrossing: { type: Date, required: true },
    timeOfCrossing: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    status: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Travel", travelSchema);
