import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = new mongoose();

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passportNum: { type: String, required: true },
    nationality: {
      type: String,
      required: true,
      enum: [
        "Austria",
        "Belgium",
        "Bulgary",
        "Great Britain",
        "Hungary",
        "Germany",
        "Greece",
        "Denmark",
        "Ireland",
        "Spain",
        "Italy",
        "Cyprus",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Netherlands",
        "Poland",
        "Portugal",
        "Romania",
        "Slovakia",
        "Slovenia",
        "Finland",
        "France",
        "Croatia",
        "Czech Republic",
        "Sweden",
        "Estonia",
      ],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
