const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});


blogsRouter.post('/', (request, response) => {
  if (!(request.body.title && request.body.url)) return response.status(400).json({ error: 'missing data' });

  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
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
