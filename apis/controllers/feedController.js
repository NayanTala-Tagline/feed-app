import { response } from "../helpers/common.js";
import { RESPONSE_MESSAGE, STATUS_CODE } from "../helpers/constant.js";
import {
  countFeed,
  createFeed,
  findFeed,
  findOneAndUpdateFeed,
} from "../services/feedService.js";
import { uploadFiles } from "../utils/cloudinary.js";

export const addFeed = async (req, res, next) => {
  try {
    const { files } = req;
    const { username, caption } = req.body;

    const imageUrls = await uploadFiles(
      files,
      "feed",
      `users/${username}/feeds`
    );

    const createdFeed = await createFeed({
      imageUrls,
      caption,
      username,
    });
    return response(
      true,
      res,
      STATUS_CODE.CREATED,
      RESPONSE_MESSAGE.FEED_CREATED,
      createdFeed
    );
  } catch (error) {
    next(error);
  }
};

export const getFeedList = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const feedList = await findFeed(
      { deletedAt: null },
      { _id: 1, imageUrls: 1, caption: 1, username: 1, likes: 1, createdAt: 1 }
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const feedCount = await countFeed({
      deletedAt: null,
    });
    return response(
      true,
      res,
      STATUS_CODE.OK,
      RESPONSE_MESSAGE.FEED_RETRIEVED,
      { feedList,currentPage: page || 1, totalPages: Math.ceil(feedCount / limit) || 1 }
    );
  } catch (error) {
    next(error);
  }
};

export const likeFeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    findOneAndUpdateFeed(
      { _id: id, deletedAt: null },
      { $inc: { likes: 1 } },
      { new: true }
    );
    return response(
      true,
      res,
      STATUS_CODE.OK,
      RESPONSE_MESSAGE.FEED_LIKED,
    );
  } catch (error) {
    next(error);
  }
};
