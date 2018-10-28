const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const { format, blogsInDb } = require('./testHelper');

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

  describe('api/blogs GET', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('there are two blogs', async () => {
      const res = await api
        .get('/api/blogs');

      expect(res.body.length).toBe(testBlogs.length);
    });
  });


  describe('api/blogs POST', () => {
    test('correctly formatted blog is saved to the db', async () => {
      const newBlog = ({
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 4,
      });

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter.length).toBe(testBlogs.length + 1);
      expect(blogsAfter).toContainEqual(newBlog);
    });


    test('blog post missing likes attribute is defaulted to zero', async () => {
      const res = await api
        .post('/api/blogs')
        .send({
          title: 'cool blog',
          author: 'blg writer man',
          url: 'http://blog.blog.com',
        });

      expect(res.body.likes).toBe(0);
    });

    test('submitting a blog without name or ulr returns 400 status', async () => {
      const res = await api
        .post('/api/blogs')
        .send({
          author: 'blg writer man',
          likes: '3'
        })
        .expect(400);
    });

  });
});

afterAll(() => server.close());