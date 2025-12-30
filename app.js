const express = require('express')
const mongoose = require("mongoose")
const logger = require('./utils/logger')
const config = require('./utils/config')
const bloglistRouter = require('./controllers/bloglist')

const app = express()
logger.info('Connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { family: 4 }).then(() => logger.info('Connected to MongoDB')).catch(error => logger.error('Error connecting to MongoDB', error.message))

app.use(express.json())
app.use('/api/blogs', bloglistRouter)

module.exports = app