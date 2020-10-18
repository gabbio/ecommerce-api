const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = express()

const tokenSecret = process.env.TOKEN_SECRET

auth.use((req, res, next) => {
  let token = req.headers.authorization

  if (!token) return res.status(401).send('Missing token!')

  // Ensures token has no extra characters
  if (token.startsWith('Token ')) token = token.slice(6, token.length)
  if (token.startsWith('Bearer ')) token = token.slice(7, token.length)

  // Halts request if verification failed
  try {
    jwt.verify(token, tokenSecret)
  } catch {
    return res.status(401).send('Invalid token!')
  }

  // Continues request otherwise
  req.user = jwt.decode(token)

  next()
})

module.exports = auth