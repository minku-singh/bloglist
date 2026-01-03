const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, b) => {return s + b.likes}, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((mostLiked, blog) => {
    return blog.likes > mostLiked.likes ? blog : mostLiked
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}