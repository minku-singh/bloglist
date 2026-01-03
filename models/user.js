const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3, 
    required: true, 
    unique: true
  },
  password: {
    type: String,
    minLength: 3, 
    required: true
  }, 
  name: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User