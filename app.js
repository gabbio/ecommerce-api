const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.get('/', (request, response) => {
  response.send('I am alive!')
})

app.listen(5000)