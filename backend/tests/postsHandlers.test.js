const request = require('supertest');
const app = require('./setupTests');
const { db } = require('../datastore');
const { verifyJwt, hashPassword, signJwt } = require('../utils/auth');
const { testUser, testCategory1, testPosts } = require('./testData')

const testPost = testPosts[0]

const testCategory = testCategory1

let jwt;
beforeEach(async () => {
    // simulate a successful sign up operation
    const user = await db.createUser({ ...testUser, password: hashPassword(testUser.password) });
    jwt = signJwt(
        {
            userId: user._id,   // user._id is of type ObjectId
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    );
})

describe('Post related endpoints End-to-End Tests', () => {
    describe('createPostHandler', () => {
        it('should return status 400 if the request body is missing required fields', async () => {
            const response = await request(app)
                .post('/posts')
                .set('Authorization', `Bearer ${jwt}`)
                .send({}) // Missing required fields
                .expect(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should create a new post and return it with status 201', async () => {
            const payload = verifyJwt(jwt)
            await db.createCategory(payload.userId, testCategory)
            const response = await request(app)
                .post('/posts')
                .set('Authorization', `Bearer ${jwt}`)
                .send(testPost)
                .expect(201);

            expect(response.body).toHaveProperty('userId', payload.userId);
            expect(response.body).toHaveProperty('url', testPost.url);
            expect(response.body).toHaveProperty('categoryName', testPost.categoryName);
        });
    });

    describe('deletePostHandler', () => {
        it('should delete a post and return success', async () => {
            const payload = verifyJwt(jwt)
            db.createCategory(payload.userId, testCategory)
            const post = await db.createPost({ userId: payload.userId, ...testPost })
            const response = await request(app)
                .delete(`/posts/${post._id}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);
            expect(response.body).toHaveProperty('deletion', 'success');
        });
    });


    describe('getPostsCountHandler', () => {
        it('should return 0 if no there is no posts', async () => {
            const response = await request(app)
                .get('/postscount')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveProperty('count');
            expect(response.body.count).toBe(0)
        });
        it('should return the count of posts for a user', async () => {
            const payload = verifyJwt(jwt)
            await db.createCategory(payload.userId, testCategory)
            await db.createPost({ userId: payload.userId, ...testPost })
            const response = await request(app)
                .get('/postscount')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveProperty('count');
            expect(response.body.count).toBe(1)
        });
    });

    describe('getPostsCountInCategoryHandler', () => {
        it('should return 0 if there are no posts in the category', async () => {
            const response = await request(app)
                .get(`/postscount/${testCategory}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveProperty('count');
            expect(response.body.count).toBe(0);
        });

        it('should return the count of posts in the specified category', async () => {
            const payload = verifyJwt(jwt)
            await db.createCategory(payload.userId, testCategory)
            await db.createPost({ userId: payload.userId, ...testPost })
            const response = await request(app)
                .get(`/postscount/${testCategory.name}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveProperty('count');
            expect(response.body.count).toBe(1);
        });
    });

    describe('listPostsHandler', () => {

        let results
        beforeEach(async () => {
            const payload = verifyJwt(jwt)
            results = []
            for (let post of testPosts) {
                const dbPost = await db.createPost({ ...post, userId: payload.userId })
                results.push(dbPost)
            }
        });

        it('should list the next posts with default parameters', async () => {
            const response = await request(app)
                .get('/posts')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveLength(5);
            expect(response.body[0]._id).toBe(results[0]._id.toString())
            expect(response.body[4]._id).toBe(results[4]._id.toString())
        });

        it('should list the next posts with specified cursor and limit', async () => {
            const response = await request(app)
                .get('/posts')
                .set('Authorization', `Bearer ${jwt}`)
                .query({ cursor: results[1]._id.toString(), dir: 'next', limit: 3 })
                .expect(200);

            expect(response.body).toHaveLength(3);
            expect(response.body[0]._id).toBe(results[2]._id.toString())
            expect(response.body[2]._id).toBe(results[4]._id.toString())
        });

        it('should list the previous posts with specified cursor and limit', async () => {
            const response = await request(app)
                .get('/posts')
                .set('Authorization', `Bearer ${jwt}`)
                .query({ cursor: results[3]._id.toString(), dir: 'previous', limit: 2 })
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body[0]._id).toBe(results[1]._id.toString())
            expect(response.body[1]._id).toBe(results[2]._id.toString())
        });
    });

    describe('listPostsInCategoryHandler', () => {
        let results;
        const category = testCategory1.name;

        beforeEach(async () => {
            const payload = verifyJwt(jwt);
            results = [];
            for (let post of testPosts) {
                const dbPost = await db.createPost({ ...post, userId: payload.userId });
                results.push(dbPost);
            }
        });

        it('should list the next posts in a category with default parameters', async () => {
            const response = await request(app)
                .get(`/posts/${category}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);

            expect(response.body).toHaveLength(5);
            expect(response.body[0]._id).toBe(results[0]._id.toString());
            expect(response.body[4]._id).toBe(results[7]._id.toString());
        });

        it('should list the next posts in a category with specified cursor and limit', async () => {
            const response = await request(app)
                .get(`/posts/${category}`)
                .set('Authorization', `Bearer ${jwt}`)
                .query({ cursor: results[1]._id.toString(), dir: 'next', limit: 3 })
                .expect(200);

            expect(response.body).toHaveLength(3);
            expect(response.body[0]._id).toBe(results[2]._id.toString());
            expect(response.body[2]._id).toBe(results[6]._id.toString());
        });

        it('should list the previous posts in a category with specified cursor and limit', async () => {
            const response = await request(app)
                .get(`/posts/${category}`)
                .set('Authorization', `Bearer ${jwt}`)
                .query({ cursor: results[6]._id.toString(), dir: 'previous', limit: 2 })
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body[0]._id).toBe(results[2]._id.toString());
            expect(response.body[1]._id).toBe(results[5]._id.toString());
        });
    });
});