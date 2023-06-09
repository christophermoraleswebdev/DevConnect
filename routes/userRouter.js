const Router = require('express').Router()
const controller = require('../controllers/userController')



Router.get('/', controller.allUsers)
Router.put('/', controller.updateUser)



module.exports = Router 