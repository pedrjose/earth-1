import { createNewsService, findAllNewsService, findTrendNewsService, findNewsByIdService, findNewsByTitleService, findNewsByUserService, updateNewsService, deleteNewsService, likeNewsService, addCommentService, removeCommentService } from "../services/news.service.js";

export const createNewsController = async (req, res) => {
    try {
        const { title, content, banner } = req.body;
        const creatorId = req.userId;

        const creatingNews = await createNewsService(title, content, banner, creatorId);

        res.send(creatingNews);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const findAllNewsController = async (req, res) => {
    try {
        const news = await findAllNewsService();

        res.send(news);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

export const findTrendNewsController = async (req, res) => {
    try {
        const trendNews = await findTrendNewsService();

        res.send(trendNews);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const fetchedNews = await findNewsByIdService(id);

        res.send(fetchedNews);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsByTitleController = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await findNewsByTitleService(title);

        console.log(news);

        res.send(news);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findNewsByUserController = async (req, res) => {
    try {
        const id = req.userId;

        const userNews = await findNewsByUserService(id);

        res.send(userNews);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const updateNewsController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, banner } = req.body;

        const authorId = req.userId;

        const updateNews = await updateNewsService(id, authorId, title, content, banner);

        res.status(201).send(updateNews);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const deleteNewsController = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.userId;

        const deleteOperation = await deleteNewsService(id, authorId);

        res.send(deleteOperation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const likeNewsController = async (req, res) => {
    try {
        const { id } = req.params;
        const likedBy = req.userId;

        const liked = await likeNewsService(id, likedBy);

        res.send(liked);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const addCommentController = async (req, res) => {
    try {
        const { comment } = req.body;
        const { id } = req.params;
        const userId = req.userId;

        const commenting = await addCommentService(id, userId, comment);

        res.send(commenting);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const removeCommentController = async (req, res) => {
    try {
        const { idNews, idComment } = req.params;
        const userId = req.userId;

        const removingComment = await removeCommentService(idNews, idComment, userId);

        res.send(removingComment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}