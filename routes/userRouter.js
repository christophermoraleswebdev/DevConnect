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
// Create User Request Payload
// {
//   "username": "newuser",
//   "email": "newuser@example.com",
//   "password": "password123",
//   "name": "New User",   
//   "profilePicture": "profile.jpg",
//   "isAdmin": false,
//   "description": "New user description",
//   "city": "New York"
// }


// http://localhost:3001/api/user/6487a0fc20815a6e21eb5bc4
Router.delete('/:id', controller.deleteUser)


Router.get('/login/', controller.loginController)



module.exports = Router 