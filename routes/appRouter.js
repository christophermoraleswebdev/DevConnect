const Router = require('express').Router()
const userRouter = require('./userRouter')
const postRouter = require('./postRouter')



Router.use('/user', userRouter)
Router.use('/post', postRouter)




module.exports = Router 