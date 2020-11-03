const { CartItem, User, Item } = require('../models/index')

// Merge duplicated cart items
function mergeDuplicated(items) {
  return items.reduce((uniqCartItems, currentCartItem) => {

    // Sums quantities if duplicate item
    let uniqIndex = uniqCartItems.findIndex((uniqCartItem) => { return uniqCartItem.item_id === currentCartItem.item_id })

    if (uniqIndex >= 0) {
      uniqCartItems[uniqIndex].quantity += currentCartItem.quantity
    } else {
      uniqCartItems.push(currentCartItem)
    }

    return uniqCartItems
  }, [])
}

class CartsController {

  // Add items to cart
  async addItems(req, res) {
    let cartItems = req.body.cart_items

    if (!(cartItems instanceof Array) || cartItems.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'No items provided!'
      })
    }

    let uniqCartItems = mergeDuplicated(cartItems)

    let auth_user = await User.findByPk(req.user.id)

    CartItem.bulkCreate(uniqCartItems, { returning: true, validate: true }).then((result) => {
      auth_user.addCartItems(result).then((data) => {
        res.status(201).send({
          success: true,
          message: 'Items uccessfully added to cart!',
          cart_items: result
        })
      }).catch((err) => {
        res.status(422).send({
          success: false,
          message: 'Please check provided data!'
        })
      })
    }).catch((err) => {
      res.status(422).send({
        success: false,
        message: 'Cannot add items to cart!'
      })
    })
  }

  // Retrieve a single item based on provided ID
  async getCart(req, res) {
    let auth_user = await User.findByPk(req.user.id)

    auth_user.getCartItems({
      attributes: ['id', 'quantity'],
      include: [Item]
    }).then((cart_items) => {
      res.status(200).send({
        success: true,
        message: 'Cart succeesfully retrieved!',
        cart_items
      })
    }).catch((err) => {
      res.status(422).send({
        success: false,
        message: 'Cannot retrieve cart!'
      })
    })
  }

  // Delete an item based on provided ID
  async deleteItem(req, res) {
    let cartItemId = parseInt(req.params.id)

    let auth_user = await User.findByPk(req.user.id)
    let cartItems = await auth_user.getCartItems({ where: { id: cartItemId } })

    if (cartItems.length === 0) {
      return res.status(404).send({
        succes: false,
        message: 'Cart item not found!'
      })
    }

    cartItems[0].destroy().then(() => {
      res.sendStatus(204)
    }).catch((err) => {
      res.status(422).send({
        succes: false,
        message: 'Cannot delete cart item'
      })
    })
  }
}

module.exports = (new CartsController())