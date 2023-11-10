const express = require('express');
const cors = require('cors');
const { signUpHandler, signInHandler } = require('./handlers/authHandlers');
const { authMiddleWare } = require('./middleware/authMiddleWare');
const {
    listPostsHandler, listPostsInCategoryHandler,
    createPostHandler, deletePostHandler,
    getPostsCountHandler, getPostsCountInCategoryHandler,
} = require('./handlers/postsHandlers');
const { listCategoriesHandler, createCategoryHandler, deleteCategoryHandler } = require('./handlers/categoriesHandlers');
const proxyHandler = require('./handlers/proxyHandler');

function createExpressApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // proxy
    app.get('/proxy', proxyHandler);

    // auth
    app.post('/signup', signUpHandler);
    app.post('/signin', signInHandler);
    app.use(authMiddleWare);
    app.get('/secured', (req, res) => {
        res.status(200).json({ userId: res.locals.userId });
    });
    // posts
    app.get('/postscount', getPostsCountHandler);
    app.get('/postscount/:category', getPostsCountInCategoryHandler);
    app.get('/posts', listPostsHandler);
    app.get('/posts/:category', listPostsInCategoryHandler);
    // app.get("/posts/:id", (req, res) => {
    //     // getPostById(userId,posjtId)
    // });
    // this endpoint is commented because it overlaps with 'GET /posts/:category'
    app.post('/posts', createPostHandler);
    app.delete('/posts/:id', deletePostHandler);

    // categories
    app.get('/categories', listCategoriesHandler);
    app.post('/categories', createCategoryHandler);
    app.delete('/categories/:name', deleteCategoryHandler);
    return app
}

module.exports = createExpressApp