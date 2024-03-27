import feedModel from "../models/feedModel.js";

export const findOneFeed = (query, projection, options) => {
  return feedModel.findOne(query, projection, options);
};

export const createFeed = (feed) => {
  return feedModel.create(feed);
};

export const findFeed = (query, projection, option) => {
  return feedModel.find(query, projection, option);
};

export const countFeed = (query)=>{
  return feedModel.countDocuments(query);
}

export const findOneAndUpdateFeed = (query, update, options)=>{
  return feedModel.findOneAndUpdate(query, update, options);
}