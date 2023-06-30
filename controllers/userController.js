const { User } = require('../models')


// Find All Users 
const allUsers = async (req, res) => {
  try{
    const users = await User.find()
    if(!users) throw Error ('User not found')
    res.status(200).json(users)
  } catch (e) {
      console.log(e)
      res.status(500).send('User not found')
  }
}

// Find User By ID 
const findUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if(!user) throw Error ('User not found')
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send('User not found')
  }
}

// Find User By Name 
const findUserByName = async (req, res) => {
  try {
    const name = req.params.name
    const regex = new RegExp(name, 'i') // 'i' flag makes the search case-insensitive
    const user = await User.find({ name: regex })
    if (!user) throw Error('User not found')
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send('User not found')
  }
}

// Create New User
const createUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture, isAdmin, description, city} = req.body
    const name = req.body.name

    // Check If Username or Email Exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" })
    }

    // Create a New User
    const newUser = new User({
      username,
      email,
      password,
      name,
      profilePicture,
      isAdmin,
      description,
      city,
    })

    // Save User
    const savedUser = await newUser.save()

    // Return the saved user object as a response
    res.status(201).json(savedUser)
  } catch (error) {
    // Handle Errors
    res.status(500).json({ message: "Internal server error" })
  }
}

// Update User
const updateUser = async (req, res) => {
      const { username, email, password, profilePicture, description, city } = req.body
  const userId = req.params.id
  
  try {
    // Find the user by ID
    const user = await User.findById(userId)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update the user properties
    user.username = username || user.username
    user.email = email || user.email
    user.password = password || user.password
    user.profilePicture = profilePicture || user.profilePicture
    user.description = description || user.description
    user.city = city || user.city

    // Save the updated user
    const updatedUser = await user.save()

    res.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error })
  }
}

// Delete User 
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    console.log('User ID:', id)

    // Delete By Id
    const deletedUser = await User.findByIdAndRemove(id)

    console.log('Deleted User:', deletedUser)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    // Handle Errors
    console.log('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Login 
const loginController = async (req, res) => {
  try {
     const { email, password } = req.body

     // Check if the user exists 
     const user = await User.findOne({ email })

     if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" })
     }

     // Update the user's signedIn status to true
     user.signedIn = true
     await user.save()
     

     res.status(200).json({ message: "Login successful" })
  } catch (err) {
     console.error(err)
     res.status(500).json({ message: "Internal server error" })
  }
}

// Sign-out 
const signOutController = async (req, res) => {
  console.log('working')
  try {


    const { email } = req.body
 
    const user = await User.findOneAndUpdate({ email: email }, { signedIn: false })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.sendStatus(200) 
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}




module.exports = {
    allUsers, 
    findUserById,
    findUserByName, 
    createUser,  
    updateUser,
    deleteUser,
    loginController, 
    signOutController
}