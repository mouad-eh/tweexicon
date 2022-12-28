const { verifyJwt } = require("../utils/auth");

async function authMiddleWare(req, res, next) {
    //status code is used to distinguish between the two possible responses
    //no need to add error code in the response body
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: "user is not authorized."
        });
    }
    const token = req.headers.authorization.split(" ")[1]; //authorization: Bearer <token>
    try {
        var payload = verifyJwt(token);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
    res.locals.userId = payload.userId;
    return next();
}

module.exports = { authMiddleWare };