'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Item, { foreignKey: 'item_id' })
      CartItem.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };

  CartItem.init({
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CartItem',
  });

  return CartItem;
};