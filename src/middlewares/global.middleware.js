import mongoose from 'mongoose';
import { findByIdRepository } from '../Repositories/user.repositories.js';

export const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await findByIdRepository(id);

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const updateFormValidation = (req, res, next) => {
    try {
        const { title, content, banner } = req.body;

        if (!title && !content && !banner) {
            return res.status(400).send({ message: "Submit at least one field for update" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}