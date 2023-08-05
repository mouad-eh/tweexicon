const { db } = require('../datastore/index');

async function listPostsHandler(req, res) {
  let posts;
  const { userId } = res.locals;
  const { cursor = undefined, limit = 5, dir = 'next' } = req.query;
  if (!cursor) {
    posts = await db.listNextPosts(userId, limit);
  } else if (dir === 'next') {
    posts = await db.listNextPosts(userId, limit, cursor);
  } else { // dir == "previous"
    posts = await db.listPreviousPosts(userId, limit, cursor);
  }
  return res.send(posts);
}
async function listPostsInCategoryHandler(req, res) {
  let posts;
  const { userId } = res.locals;
  const categoryName = req.params.category;
  const { cursor = undefined, limit = 5, dir } = req.query;
  if (!cursor) {
    posts = await db.listNextPostsInCategory(userId, categoryName, limit);
  } else if (dir === 'next') {
    posts = await db.listNextPostsInCategory(userId, categoryName, limit, cursor);
  } else { // dir == "previous"
    posts = await db.listPreviousPostsInCategory(userId, categoryName, limit, cursor);
  }
  return res.send(posts);
}
async function createPostHandler(req, res) {
  const { url, categoryName } = req.body;
  const post = await db.createPost({
    userId: res.locals.userId,
    url,
    categoryName,
  });
  return res.status(201).send(post);
}
async function deletePostHandler(req, res) {
  await db.deletePost(res.locals.userId, req.params.id);
  // if (!result.deletedCount) {
  //     return res.status(500).send({ error: "Post deletion failed." });
  // }
  return res.send({ deletion: 'success' });
}

async function getPostsCountHandler(req, res) {
  const result = await db.getPostsCount(res.locals.userId);
  return res.send({ count: result });
}

async function getPostsCountInCategoryHandler(req, res) {
  const result = await db.getPostsCountInCategory(res.locals.userId, req.params.category);
  return res.send({ count: result });
}
module.exports = {
  listPostsHandler,
  listPostsInCategoryHandler,
  createPostHandler,
  deletePostHandler,
  getPostsCountHandler,
  getPostsCountInCategoryHandler,
};
