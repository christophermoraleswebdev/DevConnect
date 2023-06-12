const Router = require('express').Router()
const controller = require('../controllers/userController')

//http://localhost:3001/api/user
Router.get('/', controller.allUsers) 

http://localhost:3001/api/user/6487669d8a9b780310ac3efd
Router.get('/:id', controller.findUserById)

// http://localhost:3001/api/user/name/john%20doe
Router.get('/name/:name', controller.findUserByName)

// http://localhost:3001/api/user/6487669d8a9b780310ac3efd --> use the id
Router.put('/:id', controller.updateUser)


Router.post('/', controller.createUser)


Router.put('/:id', controller.deleteUser)


Router.get('/login/', controller.loginController)



module.exports = Router 