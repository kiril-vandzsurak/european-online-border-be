import express from "express";
import UserModel from "./model.js";
import createHttpError from "http-errors";
import { createAccessToken } from "../../lib/auth/tools.js";
import { JWTAuthMiddleware } from "../../lib/auth/jwtAuth.js";
import upload from "../../controllers/uploadHandler.js";
import path from "path";

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

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.checkCredentials(email, password);
    if (user) {
      const payload = { _id: user._id };
      const accessToken = await createAccessToken(payload);
      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const user = await UserModel.findById(req.user._id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  "/me/:id/photo",
  upload.single("passportPhoto"),
  async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const imagePath = req.file.path;
      const imageHost = "http://localhost:3001";
      const imageUrl = `${imageHost}/${imagePath}`;

      user.passportPhoto = imageUrl;

      await user.save();

      res.status(200).send({ imageUrl });
    } catch (error) {
      next(error);
    }
  }
);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

userRouter.get("/me/:id/photo", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.passportPhoto) {
      throw new Error("Passport photo not found for user");
    }

    console.log("userPhoto:", user.passportPhoto);

    const imagePath = path.join(
      __dirname,
      "../../../uploads",
      user.passportPhoto
    );
    console.log("imagePath:", imagePath);

    const imageBuffer = await fs.promises.readFile(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    res.status(200).send({ image: imageBase64 });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
