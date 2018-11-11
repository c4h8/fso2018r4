const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const getUserFromToken = require('../utils/getUserFromToken');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });

    response.json(blogs);
  } catch (e) {
    console.log(e);
    response.send(400, { error: 'something went wrong' });
  }
});


blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) return response.status(400).json({ error: 'missing data' });

  try {
    const { authenticatedUser, error } = await getUserFromToken(request);

    if(error) return response.status(400).json({ error });

    const blog = new Blog({ ...request.body, user: authenticatedUser._id });
    const savedBlog = await blog.save();

    authenticatedUser.blogs = authenticatedUser.blogs.concat(savedBlog._id);

    await authenticatedUser.save();

    response.status(201).json(savedBlog);

  } catch (e) {
    console.log(e);
    response.send(400, { error: 'something went wrong' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const { authenticatedUser, error } = await getUserFromToken(request);

    if(error) return response.status(400).json({ error });

    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 });

    if(blog.user._id.toString() === authenticatedUser._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      return response.status(204).end();
    }

    response.send(401, { error: 'not authorized' });
  } catch (e) {
    console.log(e);
    response.send(400, { error: 'invalid id' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  if (!(request.body.title && request.body.url)) return response.status(400).json({ error: 'missing data' });

  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(204).end();
  } catch (e) {
    console.log(e);
    response.send(400, { error: 'invalid id' });
  }
});

module.exports = blogsRouter;
