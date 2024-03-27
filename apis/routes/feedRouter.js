import express from "express";
import multer from "multer";
import { addFeed, getFeedList, likeFeed } from "../controllers/feedController.js";
import { validator } from "../middlewares/validator.js";
import { addFeedSchema, getFeedListSchema, likeFeedSchema } from "../validations/feedValidations.js";

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 1000,
  },
});

router.post("/", upload.array("file"),validator(addFeedSchema),  addFeed);
router.get("/",validator(getFeedListSchema), getFeedList)
router.patch("/like/:id", validator(likeFeedSchema), likeFeed)

export default router;
