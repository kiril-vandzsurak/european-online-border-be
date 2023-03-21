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
    carBrand: { type: String, required: false },
    carModel: { type: String, required: false },
    drivingLicenseNum: { type: String, required: false },
    carInsuranceNum: { type: String, required: false },
    carVinCode: { type: String, required: false },
    carLicensePlate: { type: String, required: false },
    dateOfCrossing: { type: Date, required: true },
    timeOfCrossing: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    status: { type: String, required: false },
    reasonOfReject: { type: String, required: false, default: "" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.dateOfCrossing = formatDate(ret.dateOfCrossing);
        //delete ret.reasonOfReject;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.dateOfCrossing = formatDate(ret.dateOfCrossing);
        //delete ret.reasonOfReject;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default model("Travel", travelSchema);
