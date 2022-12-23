const { verifyJwt } = require("../auth");

async function authMiddleWare(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]; //authorization: Bearer <token>
    try {
        var payload = verifyJwt(token);
    } catch (err) {
        return res.status(401).send({ error: err }); // 401 unauthorized
    }
    res.locals.userId = payload.userId;
    return next();
}

module.exports = { authMiddleWare };