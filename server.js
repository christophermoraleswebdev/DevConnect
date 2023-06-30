const express = require('express')
const PORT = process.env.PORT || 3001
const db = require('./db')
const AppRouter = require('./routes/appRouter')
const cors = require('cors')
const landingPage = require('./controllers/userController')
const postsLandingPage = require('./controllers/postController')
const app = express()



app.use(cors())
app.use(express.json())

app.get('/', landingPage.allUsers)
app.get('/', postsLandingPage.getAllPosts)
app.use('/api', AppRouter)

app.get('/', (req, res) => {
      res.send('This is root!')
})
    
app.listen(PORT, () => {
      console.log(`Express servers on port: ${PORT}`)})