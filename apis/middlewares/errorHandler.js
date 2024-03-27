import { response } from "../helpers/common.js";
import { RESPONSE_MESSAGE } from "../helpers/constant.js";



export const errorHandler = (err, req, res, next) => {
  if (err.name === "MulterError") {
    switch (err.code) {
      case "LIMIT_UNEXPECTED_FILE":
        return response(
          false,
          res,
          STATUS_CODE.BAD_REQUEST,
          RESPONSE_MESSAGE.FILE_UPLOAD_UNEXPECTED_FILE_ERROR
        );

      case "LIMIT_FILE_SIZE":
        return response(
          false,
          res,
          STATUS_CODE.BAD_REQUEST,
          RESPONSE_MESSAGE.FILE_UPLOAD_LIMIT_SIZE_ERROR
        );

      default:
        return response(
          false,
          res,
          STATUS_CODE.BAD_REQUEST,
          RESPONSE_MESSAGE.FILE_UPLOAD_ERROR
        );
    }
  }

  console.log("Middleware Error Handling:>>\n", err);
  return response(
    false,
    res,
    STATUS_CODE.INTERNAL_SERVER_ERROR,
    RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
  );
};
