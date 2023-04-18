import News from "../models/News.js";

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNewsService = () => News.countDocuments();

export const findTrendNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

export const findNewsByIdService = (id) => News.findById(id).populate("user");

export const findNewsByTitleService = (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" }, }).sort({ _id: -1 }).populate("user");

export const findNewsByUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateNewsService = (id, title, content, banner) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, content, banner },
        {
            rawResult: true,
        }
    );

export const deleteNewsService = (id) => News.findOneAndDelete({ _id: id });

export const likedNewsService = (id, likedBy) => News.findOneAndUpdate(
    { _id: id, "likes.likedBy": { $nin: [likedBy] } },
    { $push: { likes: { likedBy, created: new Date() } } }
);

export const deleteLikeService = (id, likedBy) =>
    News.findByIdAndUpdate({ _id: id }, { $pull: { likes: { likedBy } } });

export const addCommentService = (idNews, idComment, userId, comment, createdAt) =>
    News.findOneAndUpdate({ _id: idNews }, {
        $push:
        {
            comments:
                { idComment, userId, comment, createdAt },
        },
    });

export const deleteCommentService = (idNews, idComment, userId) =>
    News.findOneAndUpdate({ _id: idNews }, { $pull: { comments: { idComment, userId } } });