import Joi from "joi";

export const addFeedSchema = Joi.object({
  username: Joi.string().required(),
  caption: Joi.string().required(),
  files: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().valid("file"),
        mimetype: Joi.string()
        .pattern(new RegExp(/^image/))
          .required()
          .error(new Error("Only images are allowed.")),
        size: Joi.number()
          .max(10000000)
          .error(new Error("Image size must be 10MB or less.")),
      }).unknown()
    )
    .required(),
});

export const getFeedListSchema = Joi.object({
  page: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
});

export const likeFeedSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
})