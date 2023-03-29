import jwt from "jsonwebtoken";

export const createAccessToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyAccessToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, originalPayload) => {
      if (err) {
        // If there's an error verifying the token, reject the promise with the error
        reject(err);
      } else {
        // If the token is successfully verified, resolve the promise with the payload
        resolve(originalPayload);
      }
    });
  });

// Example usage:
const token = "myJsonWebToken"; // Replace with your JWT
verifyAccessToken(token)
  .then((payload) => {
    console.log(payload);
  })
  .catch((err) => {
    console.error(err);
  });
