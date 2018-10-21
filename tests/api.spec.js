const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');

const testBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
];

beforeAll(async () => {
  await Blog.remove({});

  const testBlogPromises = testBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save());

  await Promise.all(testBlogPromises);
});

describe('api tests', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two notes', async () => {
    const res = await api
      .get('/api/blogs');

    expect(res.body.length).toBe(2);
  });

});

afterAll(() => server.close());