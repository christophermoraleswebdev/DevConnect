const { Post } = require('../models')

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get posts by user ID
const getPostsByUserId = async (req, res) => {
  const { id } = req.params
  try {
    const posts = await Post.find({ user: id })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new post
const createPost = async (req, res) => {
  const { user, description, img } = req.body
  try {
    const post = new Post({ user, description, img })
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a post by ID
const updatePost = async (req, res) => {
  const { id } = req.params
  const { user, description, img } = req.body
  try {
    const post = await Post.findByIdAndUpdate(id, { user, description, img }, { new: true })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findByIdAndDelete(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllPosts,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost
}
