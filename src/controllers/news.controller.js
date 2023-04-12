import { query } from "express";
import { createNewsService, findAllNewsService, countNewsService, findTrendNewsService, findNewsByIdService, findNewsByTitleService } from "../services/news.service.js";

export const createNews = async (req, res) => {
    try {
        const { title, content, banner } = req.body;

        if (!title || !content || !banner) {
            res.status(400).send({ message: "Submit all fields of article" })
        }

        await createNewsService({
            title,
            content,
            banner,
            user: req.userId,
        });

        res.status(201).send({ message: "Successfully article publish" })
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