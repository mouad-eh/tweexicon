const express = require("express");
const { connectToDb } = require("./datastore/index");
const { signUpHandler, signInHandler } = require("./handlers/authHandlers");
const { authMiddleWare } = require("./middleware/authMiddleWare");
const { listPostsHandler, listPostsInCategoryHandler, createPostHandler, deletePostHandler } = require("./handlers/postsHandlers");
const { listCategoriesHandler, createCategoryHandler, deleteCategoryHandler } = require("./handlers/categoriesHandlers")
const dotenv = require("dotenv");

(async () => {
    dotenv.config();

    await connectToDb();

    const app = express();

    app.use(express.json());

    //auth
    app.post("/signup", signUpHandler);
    app.post("/signin", signInHandler);
    app.use(authMiddleWare);

    //posts
    app.get("/posts", listPostsHandler);
    app.get("/posts/:category", listPostsInCategoryHandler);
    // app.get("/posts/:id", (req, res) => {
    //     // getPostById(userId,posjtId)
    // });
    app.post("/posts", createPostHandler);
    app.delete("/posts/:id", deletePostHandler);

    //categories
    app.get("/categories", listCategoriesHandler);
    app.post("/categories", createCategoryHandler);
    app.delete("/categories/:name", deleteCategoryHandler);

    app.listen(
        process.env.PORT || 3000,
        () => console.log("listenning on port:", process.env.PORT)
    );
})()