const db = require('../db')
const { Post } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const posts = [
    {
      user: '6487669d8a9b780310ac3efd', 
      description: 'This is the first post.',
      img: 'https://example.com/image1.jpg'
    },
    {
      user: '6487669d8a9b780310ac3efe', 
      description: 'This is the second post.',
      img: 'https://example.com/image2.jpg'
    }
    // Add more posts as needed
  ]

  await Post.insertMany(posts)
  console.log('Created posts')
}

const run = async () => {
  await main()
  db.close()
}

run()
