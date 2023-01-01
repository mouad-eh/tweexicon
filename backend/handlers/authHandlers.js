const { db } = require("../datastore/index");
const { hashPassword, signJwt } = require("../utils/auth");

async function signUpHandler(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const existing = await db.getUserByEmail(email);
    if (existing) {
        return res.status(400).send({
            error: "the provided email is already in use."
        });
    }
    const user = await db.createUser({ firstName, lastName, email, password: hashPassword(password) });
    const jwt = signJwt({ userId: user._id });
    return res.status(201).send({ jwt });
}
async function signInHandler(req, res) {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);
    if (!user) {
        return res.status(400).send({
            //code is needed here to distinguish between two possible responses
            //with 400 status code to the same request
            //this information is useful for the frontend
            error: {
                code: 450,
                message: "incorrect email address."
            }
        });
    }
    if (hashPassword(password) != user.password) {
        return res.status(400).send({
            error: {
                code: 451,
                message: "incorrect password."
            }
        });
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