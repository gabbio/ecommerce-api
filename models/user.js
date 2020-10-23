'use strict';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const authValidityTime = 3600 * 24
const tokenSecret = process.env.TOKEN_SECRET

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    // Prevents model to show protected fields
    toJSON() {
      let attributes = Object.assign({}, this.get())
      delete attributes.password

      return attributes
    }

    // Verifies password
    async validatePassword(password) {
      return await bcrypt.compareSync(password, this.password)
    }

    // Generates a new JWT
    generateAuthToken() {
      return jwt.sign({
        id: this.id,
        email: this.email,
        admin: this.admin
      }, tokenSecret, {
        algorithm: 'HS256',
        expiresIn: authValidityTime
      })
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.CartItem, { foreignKey: 'user_id' })
    }
  };

  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hash password before creating user
  User.addHook('beforeCreate', async (user, options) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
  })

  return User;
};