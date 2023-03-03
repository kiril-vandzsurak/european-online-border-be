import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passportNum: { type: String, required: false },
    nationality: {
      type: String,
      required: false,
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
    passportPhoto: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const currentUser = this;
  if (currentUser.isModified("password")) {
    const plainPW = currentUser.password;
    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const user = userDocument.toObject();

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

userSchema.static("checkCredentials", async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const passportMatch = await bcrypt.compare(password, user.password);
    if (passportMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("User", userSchema);
