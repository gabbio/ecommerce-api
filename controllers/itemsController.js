const url = require('url')
const { Item } = require('../models/index')

const defaultItemsPerPage = 50
const sortingOrders = ['DESC', 'ASC']

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

  addItem(req, res) {
    Item.create(req.body).then((created) => {
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
}

module.exports = (new ItemsController())