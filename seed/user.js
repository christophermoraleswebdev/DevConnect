const db = require('../db')
const { User } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



const main = async () => {

      const user = [
            {
                  username: "john_doe",
                  email: "john@example.com",
                  password: "password123",
                  profilePicture: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  followers: [],
                  followings: [],
                  isAdmin: false,
                  description: "Hello, I'm John Doe!",
                  city: "McAllen"
            },
            {
                  username: "jane_smith",
                  email: "jane@example.com",
                  password: "password456",
                  profilePicture: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  followers: [],
                  followings: [],
                  isAdmin: false,
                  description: "Hi, I'm Jane Smith!",
                  city: "Los Angeles"
            }
      ]

      await User.insertMany(user)
      console.log('created users')

}

const run = async () => {
      await main()
      db.close()
}

run()






