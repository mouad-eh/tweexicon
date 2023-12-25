const request = require('supertest');
const app = require('./setupTests');
const { db } = require('../datastore');
const { verifyJwt, signJwt, hashPassword } = require('../utils/auth');
const { testUser, testCategory1, testCategory2 } = require('./testData');

let jwt;
beforeEach(async () => {
  // simulate a successful sign up operation
  const user = await db.createUser({ ...testUser, password: hashPassword(testUser.password) });
  jwt = signJwt(
    {
      userId: user._id, // user._id is of type ObjectId
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  );
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
