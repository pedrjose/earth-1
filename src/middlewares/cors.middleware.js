export const corsAuth = (req, res, next) => {
    try {
        res.header('Access-Control-Allow-Origin', ['*']);
        res.header('Access-Control-Allow-Methods', ['*']);
        res.header('Access-Control-Allow-Headers', ['*']);
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}