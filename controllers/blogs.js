const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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
    const firstUser = await User.findOne({});

    const blog = new Blog({ ...request.body, user: firstUser._id });
    const savedBlog = await blog.save();

    firstUser.blogs = firstUser.blogs.concat(savedBlog._id);

    await firstUser.save();

    response.status(201).json(savedBlog);

  } catch (e) {
    console.log(e);
    response.send(400, { error: 'something went wrong' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
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
