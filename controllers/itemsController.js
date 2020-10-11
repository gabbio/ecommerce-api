const url = require('url')
const { Item } = require('../models/index')

const defaultItemsPerPage = 50
const sortingOrders = ['DESC', 'ASC']

// Allowed params
function itemAllowedParams() {
  ['name', 'photo', 'price', 'description', 'vendor_name']
}

class ItemsController {
  // Retrieve a list of items and optionally paginate and sort it by price
  getAllItems(req, res) {
    let query = url.parse(req.url, true).query
    // Sets pagination
    let page = query.page ? parseInt(query.page) : 1
    let itemsPerPage = query.perPage ? parseInt(query.perPage) : defaultItemsPerPage
    let offset = (page - 1) * itemsPerPage
    // Sets sorting order
    let priceSortingOrder = sortingOrders.includes(query.byPrice) ? query.byPrice : sortingOrders[0]

    Item.findAll({
      order: [['price', priceSortingOrder]],
      offset: offset,
      limit: itemsPerPage
    }).then((result) => {
      res.status(200).send({
        success: true,
        message: 'Items successfully retrieved!',
        items: result
      })
    }).catch((err) => {
      res.status(422).send({
        success: false,
        message: 'Something went wrong!'
      })
    });
  }

  // Create a new item
  addItem(req, res) {
    Item.create(req.body, { fields: itemAllowedParams() }).then((created) => {
      res.status(201).send({
        success: true,
        message: 'Item successfully created!',
        item: created
      })
    }).catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Cannot process your request!',
        error: err.message
      })
    })
  }

  // Retrieve a single item based on provided ID
  getItem(req, res) {
    let itemId = parseInt(req.params.id)

    Item.findByPk(itemId).then(item => {
      if (item) {
        res.status(200).send({
          success: true,
          message: 'Item successfully found!',
          item
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item not found!',
        })
      }
    }).catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Something went wrong!'
      })
    })
  }

  // Update a single item based on provided ID
  async updateItem(req, res) {
    let itemId = parseInt(req.params.id)
    let item = await Item.findByPk(itemId)

    if (item) {
      item.update(req.body, { fields: itemAllowedParams() }).then(() => {
        res.status(204).send()
      }).catch((err) => {
        res.status(422).send({
          success: false,
          message: 'Something went wrong!'
        })
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'Item not found!'
      })
    }
  }
}

module.exports = (new ItemsController())