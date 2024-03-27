import express from "express";
import feedRouter from "./feedRouter.js";

const mainRouter = express.Router();

mainRouter.use("/feeds", feedRouter);

export default mainRouter;
