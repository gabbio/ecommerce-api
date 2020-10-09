const express = require('express')
const app = express()


// Routes
app.get('/', (request, response) => {
  response.send('I am alive!')
})

app.listen(5000)