const mongoose = require('mongoose')
const Schema = mongoose.Schema



const userSchema = new Schema(
      {
            username: {
              type: String,
              require: true,
              min: 3,
              max: 20,
              unique: true,
            },
            email: {
              type: String,
              required: true,
              max: 50,
              unique: true,
            },
            password: {
              type: String,
              required: true,
              min: 6,
            },
            name: {
              type: String, 
              required: true
            },
            profilePicture: {
              type: String,
              default: "",
            },
            followers: {
              type: Array,
              default: [],
            },
            followings: {
              type: Array,
              default: [],
            },
            isAdmin: {
              type: Boolean,
              default: false,
            },
            description: {
              type: String,
              max: 70,
            },
            city: {
              type: String,
              max: 50,
            }
          },
          { timestamps: true }
)


module.exports = userSchema