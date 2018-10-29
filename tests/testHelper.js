const Blog = require('../models/blog');
const User = require('../models/user');

const format = blog => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
});

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

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

module.exports = {
  format, blogsInDb, testBlogs, usersInDb
};
