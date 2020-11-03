const express = require('express')

const isAdmin = express()


isAdmin.use((req, res, next) => {
  // Halts if user is not admin
  if (!req.user.admin) {
    return res.status(403).send('Operation not allowed!')
  }

  // Continues request otherwise
  next()
})

module.exports = isAdmin