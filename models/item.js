'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.hasMany(models.CartItem, { foreignKey: 'item_id' })
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: DataTypes.STRING,
    vendor_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};