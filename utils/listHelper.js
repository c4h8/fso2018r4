const dummy = (_blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
