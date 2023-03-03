import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  unauthorizedErrorHandler,
  notFoundHandler,
  forbiddenErrorHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import userRouter from "./api/users/index.js";
// import session from "express-session";

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

// server.use(
//   session({
//     secret: "JWT_SECRET",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

server.use("/users", userRouter);

server.use(badRequestHandler);
server.use(unauthorizedErrorHandler);
server.use(notFoundHandler);
server.use(forbiddenErrorHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_KEY);

mongoose.connection.on("connected", () => {
  console.log("Connected!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
