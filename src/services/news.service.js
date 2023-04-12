import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNewsService = () => News.countDocuments();

const findTrendNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findNewsByIdService = (id) => News.findById(id).populate("user");

export { createNewsService, findAllNewsService, countNewsService, findTrendNewsService, findNewsByIdService };