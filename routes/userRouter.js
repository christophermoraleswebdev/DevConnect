const Router = require('express').Router()
const controller = require('../controllers/userController')



Router.get('/', controller.allUsers)
Router.get('/:id', controller.findUserById)
Router.get('/name/:name', controller.findUserByName)
Router.put('/', controller.updateUser)
Router.put('/', controller.createUser)
Router.put('/:id', controller.deleteUser)
Router.get('/login/', controller.loginController)



module.exports = Router 