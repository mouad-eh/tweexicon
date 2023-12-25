const request = require('supertest');
const { signJwt, hashPassword } = require('../utils/auth');
const app = require('./setupTests');
const { db } = require('../datastore');
const { testUser } = require('./testData');

describe('Authentication Middleware Test', () => {
  it('should return 401 if authorization header is not present', async () => {
    const response = await request(app)
    // the purpose of '/secured' endpoint is to test the auth middleware
      .get('/secured')
      .expect(401);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 if JWT is invalid', async () => {
    // jwt token is invalid if:
    // -    not signed with the right secret
    // -    does not have the userId in the payload
    // -    it is expired
    const invalidToken = 'invalid-token';
    const response = await request(app)
      .get('/secured')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should set userId in locals if JWT is valid', async () => {
    // Simulate a successful sign up operation
    const user = await db.createUser({ ...testUser, password: hashPassword(testUser.password) });
    const validToken = signJwt(
      {
        userId: user._id, // user._id is of type ObjectId
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    );

    const response = await request(app)
      .get('/secured')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(response.body).toEqual({ userId: user._id.toString() });
  });
});
