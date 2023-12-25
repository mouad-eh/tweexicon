const request = require('supertest');
const app = require('./setupTests');
const { db } = require('../datastore');
const { verifyJwt } = require('../utils/auth');

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
};

const testCategory1 = {
  name: 'life',
  color: '#ff0000',
};

const testCategory2 = {
  name: 'work',
  color: '#000000',
};

let jwt;
beforeEach(async () => {
  // create a user
  const response = await request(app)
    .post('/signup')
    .send(testUser);
    // response.body.jwt
  jwt = response.body.jwt;
});

describe('Category related endpoints End-to-End Tests', () => {
  describe('listCategoriesHandler', () => {
    it('should list categories', async () => {
      const payload = verifyJwt(jwt);
      await db.createCategory(payload.userId, testCategory1);
      await db.createCategory(payload.userId, testCategory2);
      const response = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe('default');
      expect(response.body[1].name).toBe(testCategory1.name);
      expect(response.body[2].name).toBe(testCategory2.name);
    });
  });

  describe('createCategoryHandler', () => {
    it('should create a new category', async () => {
      const response = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${jwt}`)
        .send(testCategory1)
        .expect(200);

      expect(response.body).toEqual({ creation: 'success' });
    });
  });

  describe('deleteCategoryHandler', () => {
    it('should delete a category', async () => {
      const payload = verifyJwt(jwt);

      await db.createCategory(payload.userId, testCategory1);
      const response = await request(app)
        .delete(`/categories/${testCategory1.name}`)
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);

      expect(response.body).toEqual({ deletion: 'success' });
    });
  });
});
