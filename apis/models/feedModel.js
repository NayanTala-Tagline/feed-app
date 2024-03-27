import { Schema, model } from "mongoose";

const feedSchema = new Schema({
  imageUrls: [{
    type: String
  }],
  caption: {
    type: String
  },
  username: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0
  },
  deletedAt: {
    type: Date,
    default: null
  }

}, {collection: "feed",  timestamps: true, versionKey: false })

export default model("feed", feedSchema)