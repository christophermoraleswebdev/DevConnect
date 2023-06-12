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

const findUserByName = async (req, res) => {
  try {
    const name = req.params.name.replace(' ', '%20')
    const user = await User.find({ name: req.params.name })
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
    const { username, email, password, profilePicture, isAdmin, description, city } = req.body

    // Check If Username or Email Exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' })
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
      city
    })

    // Save User
    const savedUser = await newUser.save()

    // Return the saved user object as a response
    res.status(201).json(savedUser)
  } catch (error) {
    // Handle Errors
    res.status(500).json({ message: 'Internal server error' })
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
    const { userId } = req.params

    // Delete By Id
    const deletedUser = await User.findByIdAndRemove(userId)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    // Handle Errors
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Login 
const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user exists
    const user = await User.findOne({ email })

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Verify the password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isLoggedIn = await User.findById(user.id)
    isLoggedIn.isLoggedIn = true 

    // User is authenticated, redirect to their profile
    return res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    // Error
    console.error(error)
    return res.status(500).json({ error: 'An error occurred' })
  }
}


module.exports = {
    allUsers, 
    findUserById,
    findUserByName, 
    createUser,  
    updateUser,
    deleteUser,
    loginController 
}