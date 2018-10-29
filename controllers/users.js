const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

const saltRounds = 10;

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    console.log('hashsing...');
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    console.log('done hashsing!');

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users.map(User.format));
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

module.exports = usersRouter;
