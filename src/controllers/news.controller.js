import { query } from "express";
import { createNewsService, findAllNewsService, countNewsService, findTrendNewsService, findNewsByIdService, findNewsByTitleService, findNewsByUserService, updateNewsService, deleteNewsService, likedNewsService, deleteLikeService, addCommentService } from "../services/news.service.js";

export const createNews = async (req, res) => {
    try {
        const { title, content, banner } = req.body;

        if (!title || !content || !banner) {
            res.status(400).send({ message: "Submit all fields of article" });
        }

        await createNewsService({
            title,
            content,
            banner,
            user: req.userId,
        });

        res.status(201).send({ message: "Successfully article publish" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const findAllNews = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllNewsService(offset, limit);
        const newsCounter = await countNewsService();
        const routeUrlBase = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < newsCounter ? `${routeUrlBase}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit > 0 ? null : offset - limit;
        const previousUrl = previous !== null ? `${routeUrlBase}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There's not registred articles" });
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            newsCounter,

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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

export const findTrendNews = async (req, res) => {
    try {
        const trendNews = await findTrendNewsService();

        res.send({
            trendNews: {
                id: trendNews._id,
                title: trendNews.title,
                content: trendNews.content,
                banner: trendNews.banner,
                likes: trendNews.likes,
                comments: trendNews.comments,
                name: trendNews.user.name,
                icon: trendNews.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsById = async (req, res) => {
    try {
        const { id } = req.params;

        const fetchedNews = await findNewsByIdService(id);

        res.send({
            returnedNews: {
                id: fetchedNews._id,
                title: fetchedNews.title,
                content: fetchedNews.content,
                banner: fetchedNews.banner,
                likes: fetchedNews.likes,
                comments: fetchedNews.comments,
                name: fetchedNews.user.name,
                icon: fetchedNews.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await findNewsByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no articles with this title!" });
        }

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                content: item.content,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                icon: item.user.avatar,
            }))
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsByUser = async (req, res) => {
    try {
        const id = req.userId;

        const userNews = await findNewsByUserService(id);

        return res.send({
            results: userNews.map((item) => ({
                id: item._id,
                title: item.title,
                content: item.content,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                icon: item.user.avatar,
            }))
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const updateNews = async (req, res) => {
    try {
        const { title, content, banner } = req.body;
        const { id } = req.params;

        const news = await findNewsByIdService(id);

        if (news.user._id != req.userId) {
            return res.status(400).send({ message: "You're not the author of this article" });
        }

        await updateNewsService(id, title, content, banner);

        res.status(201).send({ message: "Your article was updated successfully" })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findNewsByIdService(id);

        if (news.user._id != req.userId) {
            return res.status(400).send({ message: "You're not the author of this article" });
        }

        await deleteNewsService(id);

        return res.send({ message: "Your article was deleted with sucess" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const likedBy = req.userId;

        const likedNews = await likedNewsService(id, likedBy);

        if (!likedNews) {
            await deleteLikeService(id, likedBy);
            return res.status(200).send({ message: "Like removed" });
        }

        res.send({ message: "Article liked" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).send({ message: "Write a message to comment" });
        }

        const idComment = Math.floor(Date.now() * Math.random()).toString(36);
        const createdAt = new Date();

        const userComment = { idComment, userId, comment, createdAt }

        console.log(userComment);

        await addCommentService(id, userComment);

        res.send({
            message: "Comment successfully completed!",
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};