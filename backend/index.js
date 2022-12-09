const express = require("express");

const app = express()

app.get("/", (req, res) => {
    res.send("hello world!");
});

/*
POST `/signup`
    getUserByEmail(email)
    CreateUser(User)
POST `/signin`
    getUserByEmail(email) 

auth-protected endpoints:

GET `/posts?cursor=object-id&limit=10&dir=[next,previous]`
    listPosts(userId,cursor,limit,dir): cursor is optional

GET `/posts/:category?cursor=object-id&limit=10&dir=[next,previous]`
    listPostsOfCategory(userId,cursor,limit,dir)

GET `/posts/:post_id` 
    getPostById(userId,postId)
POST `/posts`
    createPost(post)
DELETE `/posts/:post_id`
    deletePost(postId)

GET `/categories`
    listCategories(userId)
POST  `/categories`
    createCategory(category)
DELETE `/categories/:categoryName` 
    deleteCategory(categoryName)
*/

app.listen(3000, () => {
    console.log("app running on port 3000");
});