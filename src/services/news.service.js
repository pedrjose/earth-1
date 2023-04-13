import News from "../models/News.js";

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNewsService = () => News.countDocuments();

export const findTrendNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

export const findNewsByIdService = (id) => News.findById(id).populate("user");

export const findNewsByTitleService = (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" }, }).sort({ _id: -1 }).populate("user");

export const findNewsByUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");