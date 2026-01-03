const bloglistRouter = require('express').Router()
const jwt = require("jsonwebtoken")
const User = require('../models/user')
const Bloglist = require('../models/bloglist')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Bloglist.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const {title, author, url, likes} = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  
  const blog = new Bloglist({
    title, author, url, likes, user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Bloglist.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = await Bloglist.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})


module.exports = bloglistRouter