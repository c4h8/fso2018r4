const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

const saltRounds = 10;

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    if(body.password.length < 3) return response
      .status(400)
      .json({ error: 'password must be over 2 characters' });

    const passwordHash = await bcrypt.hash(body.password, saltRounds);

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
    const users = await User
      .find({})
      .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 });

    response.json(users.map(User.formatDeep));
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

module.exports = usersRouter;
