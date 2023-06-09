const express = require('express')
const db = require('./db')
const PORT = process.env.PORT || 3001
// const AppRouter = require('')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// app.get('/', landingPage.findBrands)
// app.use('/api', AppRouter)

app.listen(PORT, () => {
      console.log(`Express servers on port: ${PORT}`)})