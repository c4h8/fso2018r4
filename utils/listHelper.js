const dummy = () => {
  return 1;
};

const totalLikes = blogs => blogs.reduce((a, b) => a + b.likes, 0);

const favoriteBlog = blogs => {
  let maxIndex = undefined;
  let maxIndexLikes = -1;

  blogs.forEach((blog, index) => {
    if(blog.likes > maxIndexLikes) {
      maxIndex = index;
      maxIndexLikes = blog.likes;
    }
  });

  return maxIndex && blogs[maxIndex];
};

const mostLikes = blogs => {
  if(blogs.length === 0) return undefined;

  const likeMap = ({});

  blogs.forEach(blog => {
    if (likeMap[blog.author]) {
      likeMap[blog.author] = likeMap[blog.author] + blog.likes;
    } else {
      likeMap[blog.author] = blog.likes;
    }
  });

  let maxAuthor = undefined;
  let maxLikes = -1;

  Object.keys(likeMap).forEach(author => {
    if(likeMap[author] > maxLikes) {
      maxLikes = likeMap[author];
      maxAuthor =  author;
    }
  });

  return ({ author: maxAuthor, likes: maxLikes });
};

const mostBlogs = blogs => {
  if(blogs.length === 0) return undefined;

  const blogsMap = ({});

  blogs.forEach(blog => {
    if (blogsMap[blog.author]) {
      blogsMap[blog.author] = blogsMap[blog.author] + 1;
    } else {
      blogsMap[blog.author] = 1;
    }
  });

  let maxAuthor = undefined;
  let maxBlogs = -1;

  Object.keys(blogsMap).forEach(author => {
    if(blogsMap[author] > maxBlogs) {
      maxBlogs = blogsMap[author];
      maxAuthor =  author;
    }
  });

  return ({ author: maxAuthor, blogs: maxBlogs });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
};
