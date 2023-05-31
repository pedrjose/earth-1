import { createNewsRepository, findAllNewsRepository, countNewsRepository, findTrendNewsRepository, findNewsByIdRepository, findNewsByTitleRepository, findNewsByUserRepository, updateNewsRepository, deleteNewsRepository, likedNewsRepository, deleteLikeRepository, addCommentRepository, deleteCommentRepository } from "../Repositories/news.repositories.js";
import { findByIdRepository } from "../Repositories/user.repositories.js";

export const createNewsService = async (title, content, banner, creatorId) => {
    if (!title || !content || !banner) throw new Error("Submit all fields of article");

    const returnedNews = await createNewsRepository({ title, content, banner, user: creatorId });

    if (!returnedNews) throw new Error("Submit article failed. Try again!")

    return { message: "Article created successfully" }
}

export const findAllNewsService = async () => {
    const limit = 0;
    const offset = 0;

    const news = await findAllNewsRepository(offset, limit);

    if (news.length === 0) throw new Error("There's not registred articles");

    return ({
        newsCounter: news.length,

        results: news.map((item) => ({
            id: item._id,
            title: item.title,
            content: item.content,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            icon: item.user.avatar,
        })),
    });
}

export const findTrendNewsService = async () => {
    const searchTrendNews = await findTrendNewsRepository();

    if (!searchTrendNews) throw new Error("There's no trending news");

    return ({
        id: searchTrendNews._id,
        title: searchTrendNews.title,
        content: searchTrendNews.content,
        banner: searchTrendNews.banner,
        likes: searchTrendNews.likes,
        comments: searchTrendNews.comments,
        name: searchTrendNews.user.name,
        icon: searchTrendNews.user.avatar,
    })
}

export const findNewsByIdService = async (id) => {
    const searchNews = await findNewsByIdRepository(id);

    if (!searchNews) throw new Error("Article not found!");

    return {
        id: searchNews._id,
        title: searchNews.title,
        content: searchNews.content,
        banner: searchNews.banner,
        likes: searchNews.likes,
        comments: searchNews.comments,
        authorId: searchNews.user._id,
        name: searchNews.user.name,
        icon: searchNews.user.avatar
    }
}

export const findNewsByTitleService = async (title) => {
    const news = await findNewsByTitleRepository(title);

    if (news.length === 0) throw new Error("There are no articles with this title!");

    const results = news.map((item) => ({
        id: item._id,
        title: item.title,
        content: item.content,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        icon: item.user.avatar,
    }));

    return results;
}

export const findNewsByUserService = async (id) => {
    const news = await findNewsByUserRepository(id);

    if (news === 0) throw new Error("User has no articles into platform");

    const results = news.map((item) => ({
        id: item._id,
        title: item.title,
        content: item.content,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        icon: item.user.avatar,
    }));

    return results;
}

export const updateNewsService = async (id, authorId, title, content, banner) => {
    if (!title && !content && !banner) throw new Error("Submit at least one field to update");

    const news = await findNewsByIdRepository(id);

    if (news.user._id != authorId) throw new Error("You're not the author of this article!");

    await updateNewsRepository(id, title, content, banner);

    return { message: "Your article was updated successfully" };
}

export const deleteNewsService = async (id, authorId) => {
    const news = await findNewsByIdRepository(id);

    if (news.user._id != authorId) throw new Error("You're not the author of this article!");

    await deleteNewsRepository(id);

    return { message: "Your article was deleted successfully" };
}

export const likeNewsService = async (id, likedBy) => {
    const likedNews = await likedNewsRepository(id, likedBy);

    if (!likedNews) {
        await deleteLikeRepository(id, likedBy);
        return { message: "Like removed" };
    }

    return { message: "News liked" };
}

export const addCommentService = async (id, userId, comment) => {
    if (!comment) throw new Error("You can't send a empty comment");

    const userCommenting = await findByIdRepository(userId);

    const photo = userCommenting.avatar;
    const userName = userCommenting.name;
    
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);
    const createdAt = new Date();

    await addCommentRepository(id, userId, idComment, comment, photo, userName, createdAt);

    return { message: "Comment successfully completed!" };
}

export const removeCommentService = async (idNews, idComment, userId) => {
    const commentFilter = await findNewsByIdRepository(idNews);
    let deletedComment;

    for (let i = 0; i < commentFilter.comments.length; i++) {
        if (commentFilter.comments[i].idComment === idComment) {
            deletedComment = commentFilter.comments[i];
        }
    }

    if (!deletedComment) throw new Error("Comment not found");

    if (deletedComment.userId !== userId) throw new Error("You're not the author of this comment");

    await deleteCommentRepository(idNews, idComment, userId);

    return { message: "Comment deleted with success" };
}