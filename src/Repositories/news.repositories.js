import News from "../models/News.js";

export const createNewsRepository = (news) => News.create(news);

export const findAllNewsRepository = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNewsRepository = () => News.countDocuments();

export const findTrendNewsRepository = () => News.findOne().sort({ _id: -1 }).populate("user");

export const findNewsByIdRepository = (id) => News.findById(id).populate("user");

export const findNewsByTitleRepository = (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" }, }).sort({ _id: -1 }).populate("user");

export const findNewsByUserRepository = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateNewsRepository = (id, title, content, banner) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, content, banner },
        {
            rawResult: true,
        }
    );

export const deleteNewsRepository = (id) => News.findOneAndDelete({ _id: id });

export const likedNewsRepository = (id, likedBy) => News.findOneAndUpdate(
    { _id: id, "likes.likedBy": { $nin: [likedBy] } },
    { $push: { likes: { likedBy, created: new Date() } } }
);

export const deleteLikeRepository = (id, likedBy) =>
    News.findByIdAndUpdate({ _id: id }, { $pull: { likes: { likedBy } } });

export const addCommentRepository = (idNews, idComment, userId, comment, createdAt) =>
    News.findOneAndUpdate({ _id: idNews }, {
        $push:
        {
            comments:
                { idComment, userId, comment, createdAt },
        },
    });

export const deleteCommentRepository = (idNews, idComment, userId) =>
    News.findOneAndUpdate({ _id: idNews }, { $pull: { comments: { idComment, userId } } });