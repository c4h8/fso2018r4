const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });

  console.log('user found ', user ? true : false);
  console.log('pw hash ', user.passwordHash);


  const passwordCorrect = (user === null)
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  console.log('password correct ', passwordCorrect);

  if ( !(user && passwordCorrect) ) {
    return response.status(401).send({ error: 'invalid username or password' });
  }

  const userForToken = ({
    username: user.username,
    id: user._id
  });

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
