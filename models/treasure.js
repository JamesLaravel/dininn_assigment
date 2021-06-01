'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treasure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Treasure.hasMany(models.MoneyValue, {
        foreignKey: 'treasure_id'
      })
    }
  };
  Treasure.init({
    Latitude: DataTypes.FLOAT(11,10),
    Longitude: DataTypes.FLOAT(11,10) ,
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Treasure',
  });
  return Treasure;
};