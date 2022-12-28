const { mongoDataStore: db } = require("../datastore/mongoDB/index");

async function listPostsHandler(req, res) {
    var posts;
    const userId = res.locals.userId;
    const { cursor = undefined, limit = 5, dir = "next" } = req.query;
    if (!cursor) {
        posts = await db.listNextPosts(userId, limit);
    } else if (dir == "next") {
        posts = await db.listNextPosts(userId, limit, cursor);
    } else { // dir == "previous"
        posts = await db.listPreviousPosts(userId, limit, cursor);
    }
    return res.send(posts)
}
async function listPostsInCategoryHandler(req, res) {
    var posts;
    const userId = res.locals.userId;
    const categoryName = req.params.category;
    const { cursor = undefined, limit = 5, dir } = req.query;
    if (!cursor) {
        posts = await db.listNextPostsInCategory(userId, categoryName, limit);
    } else if (dir == "next") {
        posts = await db.listNextPostsInCategory(userId, categoryName, limit, cursor);
    } else { // dir == "previous"
        posts = await db.listPreviousPostsInCategory(userId, categoryName, limit, cursor);
    }
    return res.send(posts)
}
async function createPostHandler(req, res) {
    const { url, categoryName } = req.body;
    const post = await db.createPost({
        userId: res.locals.userId,
        url,
        categoryName
    });
    return res.status(201).send(post);
}
async function deletePostHandler(req, res) {
    const result = await db.deletePost(res.locals.userId, req.params.id);
    if (!result.deletedCount) {
        //this will never happen because we are sure that the post exists
        //since the user will be clicking the delete button in post card displayed
        return res.status(500).send({ error: "Post deletion failed." });
    }
    return res.send({ deletion: "success" });
}

module.exports = { listPostsHandler, listPostsInCategoryHandler, createPostHandler, deletePostHandler };