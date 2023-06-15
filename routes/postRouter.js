const Router = require('express').Router()
const controller = require('../controllers/postController')

// http://localhost:3001/api/post
Router.get('/', controller.getAllPosts)

// http://localhost:3001/api/post/6487669d8a9b780310ac3efd
Router.get('/:id', controller.getPostsByUserId)

// http://localhost:3001/api/post/create
Router.post('/', controller.createPost)
// Create Post Request Payload
// {
//       "_id": "648879a1e966b5706c0f3902",
//       "user": "6487669d8a9b780310ac3efe",
//       "description": "This is the third post.",
//       "img": "https://example.com/image3.jpg"
// }

// http://localhost:3001/api/post/6487669d8a9b780310ac3efd --> use the post ID
Router.put('/:id', controller.updatePost)

// http://localhost:3001/api/post/6487669d8a9b780310ac3efd --> use the post ID
Router.delete('/:id', controller.deletePost)

module.exports = Router

