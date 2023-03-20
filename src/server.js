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
import travelRouter from "./api/travel/index.js";
import path from "path";

const server = express();
const port = process.env.PORT || 3001;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

server.use(cors());
server.use(express.json());

// server.use(
//   session({
//     secret: "JWT_SECRET",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
server.set("view engine", "ejs");
server.use("/users", userRouter);
server.use("/travelForm", travelRouter);
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
