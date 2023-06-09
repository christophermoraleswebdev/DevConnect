const { User } = require('../models')



// All Users 
const allUsers = async (req, res) => {
      const users = await User.find()
      res.json(users)
}

// Update User
const updateUser = async (req, res) => {
      const { username, email, password, profilePicture, description, city } = req.body;
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user properties
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.profilePicture = profilePicture || user.profilePicture;
    user.description = description || user.description;
    user.city = city || user.city;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}













module.exports = {
      updateUser, 
      allUsers
}