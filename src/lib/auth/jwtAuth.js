import createHttpError from "http-errors";
import { verifyAccessToken } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "You should provide Bearer token in authorization header!"
      )
    );
  } else {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      console.log("Token from front-end:", accessToken); // log the token
      const payload = await verifyAccessToken(accessToken);
      req.user = {
        _id: payload._id,
      };
      next();
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
