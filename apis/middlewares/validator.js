import { response } from "../helpers/common.js"
import { STATUS_CODE } from "../helpers/constant.js"



export const validator = (validationSchema) => {
  return async (req, res, next) => {
      try {
          const inputValues = { ...req?.body, ...req?.params, ...req?.query }
          if (req?.file) inputValues.file = req?.file
          if (req?.files) inputValues.files = req?.files
          console.log('inputValues >>>', inputValues);
          await validationSchema.validateAsync(inputValues, { abortEarly: false })
          return next()
      } catch (error) {
          console.log('Validator error :>> ', error);
          return response(false, res, STATUS_CODE.BAD_REQUEST, error.message)
      }
  }
}