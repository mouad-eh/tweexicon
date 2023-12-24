const request = require('supertest');
const { signJwt } = require('../utils/auth');
const app = require('./setupTests');
const { db } = require('../datastore');

describe('Authentication Middleware Test', () => {
    const testUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
    };
    it('should return 401 if authorization header is not present', async () => {
        const response = await request(app)
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
        const user = await db.createUser(testUser)
        const validToken = signJwt(
            {
                userId: user._id,   // user._id is of type ObjectId
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        );

        const response = await request(app)
            .get('/secured')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(200);

        expect(response.body).toEqual({ userId: user._id.toString() });
    });
});
