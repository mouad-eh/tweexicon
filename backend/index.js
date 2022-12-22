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
        return res.send({ jwt });
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
        return res.send({ jwt });
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
    app.get("/posts", async (req, res) => {
        var posts;
        const userId = res.locals.userId;
        const { cursor = undefined, limit = 5, dir = "next" } = req.query;
        if (!cursor) {
            posts = await mongoDataStore.listNextPosts(userId, limit);
        } else if (dir == "next") {
            posts = await mongoDataStore.listNextPosts(userId, limit, cursor);
        } else { // dir == "previous"
            posts = await mongoDataStore.listPreviousPosts(userId, limit, cursor);
        }
        return res.send(posts)
    });
    app.get("/posts/:category", async (req, res) => {
        var posts;
        const userId = res.locals.userId;
        const categoryName = req.params.category;
        const { cursor = undefined, limit = 5, dir } = req.query;
        if (!cursor) {
            posts = await mongoDataStore.listNextPostsInCategory(userId, categoryName, limit);
        } else if (dir == "next") {
            posts = await mongoDataStore.listNextPostsInCategory(userId, categoryName, limit, cursor);
        } else { // dir == "previous"
            posts = await mongoDataStore.listPreviousPostsInCategory(userId, categoryName, limit, cursor);
        }
        return res.send(posts)
    });
    // app.get("/posts/:id", (req, res) => {
    //     // getPostById(userId,postId)
    // });
    app.post("/posts", async (req, res) => {
        const { url, categoryName } = req.body;
        const post = await mongoDataStore.createPost({
            userId: res.locals.userId,
            url,
            categoryName
        });
        return res.send(post);
    });
    app.delete("/posts/:id", async (req, res) => {
        const result = await mongoDataStore.deletePost(res.locals.userId, req.params.id);
        console.log(result);
        if (!result.deletedCount) {
            return res.status(500).send({ error: "Failed to delete the post." });
        }
        return res.send({ deletion: "Success." });
    });

    //categories
    app.get("/categories", async (req, res) => {
        const categories = await mongoDataStore.listCategories(res.locals.userId);
        return res.send(categories);
    });
    app.post("/categories", async (req, res) => {
        const category = req.body; // {name: "",color:""}
        const result = await mongoDataStore.createCategory(res.locals.userId, category);
        if (!result.modifiedCount) {
            return res.status(500).send({ error: "New category creation failed." });
        }
        return res.send({ creation: "Success." });
    });
    app.delete("/categories/:name", async (req, res) => {
        const result = await mongoDataStore.deleteCategory(res.locals.userId, req.params.name);
        if (!result.modifiedCount) {
            return res.status(500).send({ error: "Failed to delete the category." });
        }
        return res.send({ deletion: "success" });
    });

    app.listen(
        process.env.PORT || 3000,
        () => console.log("listenning on port:", process.env.PORT)
    );
})()