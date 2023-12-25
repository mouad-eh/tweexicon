const supertest = require('supertest');
const { db } = require('../datastore/index');
const { hashPassword } = require('../utils/auth');
const app = require('./setupTests');
const { testUser } = require('./testData');

describe('Authentication End-to-End Tests', () => {
  describe('POST /signup', () => {
    it('should sign up a new user and return a JWT token', async () => {
      const response = await supertest(app)
        .post('/signup')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('jwt');
    });

    it('should return 400 if email is already in use', async () => {
      // Simulate a successful sign up operation
      await db.createUser({ ...testUser, password: hashPassword(testUser.password) });

      const response = await supertest(app)
        .post('/signup')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /signin', () => {
    it('should sign in a user and return a JWT token', async () => {
      // Simulate a successful sign up operation
      await db.createUser({ ...testUser, password: hashPassword(testUser.password) });

      const response = await supertest(app)
        .post('/signin')
        .send({ email: testUser.email, password: testUser.password });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('jwt');
    });

    it('should return 400 with code 450 for incorrect email address', async () => {
      const response = await supertest(app)
        .post('/signin')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 450);
    });

    it('should return 400 with code 451 for incorrect password', async () => {
      // Simulate a successful sign up operation
      await db.createUser({ ...testUser, password: hashPassword(testUser.password) });

      const response = await supertest(app)
        .post('/signin')
        .send({ email: testUser.email, password: 'incorrectPassword' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 451);
    });
  });
});
