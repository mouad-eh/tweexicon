const { verifyJwt } = require('../utils/auth');

async function authMiddleWare(req, res, next) {
  // status code is used to distinguish between the two possible responses
  // no need to add error code in the response body
  if (!req.headers.authorization) {
    return res.status(401).send({
      error: 'user is not authorized.',
    });
  }
  const token = req.headers.authorization.split(' ')[1]; // authorization: Bearer <token>
  try {
    const payload = verifyJwt(token);
    res.locals.userId = payload.userId;
  } catch (err) {
    // err = {
    //     name: 'TokenExpiredError',
    //     message: 'jwt expired',
    //     expiredAt: 1408621000
    //   }
    // err.name will be used in the frontend to display a proper message to the user
    return res.status(400).send({ error: err });
  }
  return next();
}

module.exports = { authMiddleWare };
