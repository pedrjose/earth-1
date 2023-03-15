const create = (req, res) => {
    const { name, username, password, avatar, background } = req.body;

    if (!name || !username || !password || !avatar || !background) {
        res.status(400).send({ message: "Submit all fields for registragion" });
    }

    res.status(201).send({
        message: "User created sucessfully",
        user: {
            name,
            username,
            avatar,
            background
        }
    });
}

module.exports = { create };