const express = require("express");
const { connectToDb } = require("./datastore/index");
const { mongoDataStore } = require("./datastore/mongoDB/index");
const { hashPassword, signJwt, verifyJwt } = require("./auth");
const dotenv = require("dotenv");

(async () => {
    dotenv.config();

    await connectToDb();

    const app = express();

    app.use(express.json());

    //auth
    app.post("/signup", async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const existing = await mongoDataStore.getUserByEmail(email);
        if (existing) {
            return res.status(403).send({ error: "Email already exits." });
            // 403 forbidden
        }
        const user = await mongoDataStore.createUser({ firstName, lastName, email, password: hashPassword(password) });
        const jwt = signJwt({ userId: user._id });
        return res.status(200).send({ jwt });
    });
    app.post("/signin", async (req, res) => {
        const { email, password } = req.body;
        const user = await mongoDataStore.getUserByEmail(email);
        if (!user) {
            return res.status(401).send({ error: "Incorrect email address." });
        }
        if (hashPassword(password) != user.password) {
            return res.status(401).send({ error: "Incorrect passoword." });
        }
        const jwt = signJwt({ userId: user._id });
        return res.status(200).send({ jwt });
    });
    app.use(async (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1]; //authorization: Bearer <token>
        try {
            var payload = verifyJwt(token);
        } catch (err) {
            return res.status(401).send({ error: err }); // 401 unauthorized
        }
        res.locals.userId = payload.userId;
        return next();
    });
    //posts
    app.get("/posts/:category", (req, res) => {
        // listPostsInCategory(userId,cursor,limit,dir)
    });
    app.get("/posts/:id", (req, res) => {
        // getPostById(userId,postId)
    });
    app.get("/posts", (req, res) => {
        // listPosts(userId,cursor,limit,dir): cursor is optional
    });
    app.post("/posts", (req, res) => {
        // createPost(post)
    });
    app.delete("/posts/:id", (req, res) => {
        // deleteCategory(categoryName)
    });

    //categories
    app.get("/categories", async (req, res) => {
        const categories = await mongoDataStore.listCategories(res.locals.userId);
        return res.status(200).send(categories);
        // listCategories(userId)
    });
    app.post("/categories", (req, res) => {
        // createCategory(category)
    });
    app.delete("/categories/:name", (req, res) => {
        // deleteCategory(categoryName)
    });

    app.listen(
        process.env.PORT || 3000,
        () => console.log("listenning on port:", process.env.PORT)
    );
})()