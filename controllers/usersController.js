const { User } = require('../models/index');

class UsersController {
  // Add an new user
  async register(req, res) {
    User.create(req.body).then(user => {
      res.status(201).send({
        success: true,
        message: 'User successfully registered!',
        user
      })
    }).catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Something went wrong!',
        error: err[0].message
      })
    })
  }

  // Authenticate user
  async login(req, res) {
    // Checks user login
    if (!req.body.login) {
      res.status(422).send({
        success: false,
        message: 'Login is required!'
      })
    }

    // Checks user password
    if (!req.body.password) {
      res.status(422).send({
        success: false,
        message: 'Password is required!'
      })
    }

    let user = await User.findOne({ where: { email: req.body.login } })

    // Verifies password
    if (user && await user.validatePassword(req.body.password)) {
      // Generates JWT
      let token = user.generateAuthToken()

      res.status(200).send({
        success: true,
        message: 'Logged in successfully!',
        token
      })
    } else {
      res.status(401).send({
        success: false,
        message: 'Email or password is wrong!'
      })
    }
  }
}

module.exports = (new UsersController())