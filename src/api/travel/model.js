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
    timeOfCrossing: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Travel", travelSchema);
