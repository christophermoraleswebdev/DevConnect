const express = require('express')
const db = require('./db')
const PORT = process.env.PORT || 3001
const AppRouter = require('./routes/appRouter')
const cors = require('cors')
const landingPage = require('./controllers/userController')
const app = express()



app.use(cors())
app.use(express.json())

app.get('/', landingPage.allUsers)
app.use('/api', AppRouter)

app.get('/', (req, res) => {
      res.send('This is root!')
})
    
app.listen(PORT, () => {
      console.log(`Express servers on port: ${PORT}`)})