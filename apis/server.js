import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { response } from "./helpers/common.js";
import { connect } from "mongoose";
import { STATUS_CODE } from "./helpers/constant.js";
import mainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res, next) =>
  response(true, res, STATUS_CODE.OK, `Welcome to Feed app.`)
);
app.use("/api", mainRouter);
app.use(errorHandler)

await connect(process.env.DB_URL).then(() =>
  console.log("[DB] connection established")
);
app.listen(PORT, () => {
  console.log(`[Server] listing on ${PORT}`);
});