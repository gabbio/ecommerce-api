const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Sets routes
app.use(routes)

app.get('/', (request, response) => {
  response.send('I am alive!')
})

app.listen(5000)