const User = require("../models/user")
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()

usersRouter.get("/", async(request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

  response.json(users)
})

usersRouter.post("/", async(request, response) => {
  const {name, password, username} = request.body

  if(!(name && password && username)){
    response.status(400).send("please fill all mandatory fields")
  }

  if(username.length < 3 || password.length < 3){
    response.status(400).send("please fill valid inputs")
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name: name,
    username: username,
    password: passwordHash
  })

  const savedUser = await user.save(user)
  response.status(201).json(savedUser)
})

module.exports = usersRouter