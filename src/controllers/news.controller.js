import { createNewsService, findAllNewsService } from "../services/news.service.js";

const createNews = async (req, res) => {
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

const findAllNews = async (req, res) => {
    const news = await findAllNewsService();

    if (news.length === 0) {
        return res.status(400).send({ message: "There's not registred articles" });
    }

    res.send(news);
}

export { createNews, findAllNews };