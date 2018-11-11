const tokenMiddleware = (request, _response, next) => {
  const authorization = request.get('authorization');

  authorization && authorization.toLowerCase().startsWith('bearer ')
    ? request.token = authorization.substring(7)
    : request.token = null;

  next();
};

module.exports = tokenMiddleware;
