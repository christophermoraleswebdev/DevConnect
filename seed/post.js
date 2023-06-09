const db = require('../db')
const { Post } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



const main = async () => {

const post = [
      {
            userId: "123456789",
            description: "Amazing sunset at the beach!",
            img: "https://example.com/sunset.jpg"
      }, 
      {
            userId: "987654321",
            description: "Delicious food from the local restaurant.",
            img: "https://example.com/food.jpg"
      }
]
      await Post.insertMany(post)
      console.log('created post')
}

const run = async () => {
      await main()
      db.close()
}

run()