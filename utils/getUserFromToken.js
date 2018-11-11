const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUserFromToken = async request => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
      return ({ authenticatedUser: undefined, error: 'token missing or invalid' });
    }

    const authenticatedUser = await User.findOne({ _id: decodedToken.id });

    return ({ authenticatedUser, error: undefined });

  } catch (_e) {
    return ({ authenticatedUser: undefined, error: 'token missing or invalid' });
  }
};


module.exports = getUserFromToken;

