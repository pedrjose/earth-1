export const corsAuth = (req, res, next) => {
    try {
        // 'Content-Type'
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Access-Control-Allow-Methods', ['*']);
        res.header('Access-Control-Allow-Headers', ['*']);
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}