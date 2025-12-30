const bloglistRouter = require('express').Router()
const Bloglist = require('../models/bloglist')

bloglistRouter.get('/', (request, response) => {
  Bloglist.find({}).then(blogs => response.json(blogs))
})

bloglistRouter.post('/', (request, response) => {
  const blog = new Bloglist(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = bloglistRouter