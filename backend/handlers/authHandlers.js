const { mongoDataStore: db } = require("../datastore/mongoDb/index");
const { hashPassword, signJwt } = require("../auth");

async function signUpHandler(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const existing = await db.getUserByEmail(email);
    if (existing) {
        return res.status(403).send({ error: "Email already exits." });
        // 403 forbidden
    }
    const user = await db.createUser({ firstName, lastName, email, password: hashPassword(password) });
    const jwt = signJwt({ userId: user._id });
    return res.send({ jwt });
}
async function signInHandler(req, res) {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);
    if (!user) {
        return res.status(401).send({ error: "Incorrect email address." });
    }
    if (hashPassword(password) != user.password) {
        return res.status(401).send({ error: "Incorrect passoword." });
    }
    const jwt = signJwt({ userId: user._id });
    return res.send({
        jwt,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }); //firstName, lastName, email are returned cuz they are useful for front-end
}

module.exports = { signUpHandler, signInHandler };