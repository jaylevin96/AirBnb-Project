'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' })
      Spot.hasMany(models.Review, { foreignKey: 'spotId' })
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isFloat: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isFloat: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 49]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    /* scopes: {
      includePreview() {
        const { SpotImage } = require('../models')
        return {
          // attributes: ['id','ownerId','address','city','state','country','']
          include: {
            model: SpotImage, where: {

              preview: true
            }
          }
        }
      }
    } */
  });
  return Spot;
};
